System.register([], function (exports) {
    'use strict';
    return {
        execute: function () {

            function noop() { }
            function add_location(element, file, line, column, char) {
                element.__svelte_meta = {
                    loc: { file, line, column, char }
                };
            }
            function run(fn) {
                return fn();
            }
            function blank_object() {
                return Object.create(null);
            }
            function run_all(fns) {
                fns.forEach(run);
            }
            function is_function(thing) {
                return typeof thing === 'function';
            }
            function not_equal(a, b) {
                return a != a ? b == b : a !== b;
            }

            function append(target, node) {
                target.appendChild(node);
            }
            function insert(target, node, anchor) {
                target.insertBefore(node, anchor || null);
            }
            function detach(node) {
                node.parentNode.removeChild(node);
            }
            function element(name) {
                return document.createElement(name);
            }
            function svg_element(name) {
                return document.createElementNS('http://www.w3.org/2000/svg', name);
            }
            function text(data) {
                return document.createTextNode(data);
            }
            function space() {
                return text(' ');
            }
            function attr(node, attribute, value) {
                if (value == null)
                    node.removeAttribute(attribute);
                else if (node.getAttribute(attribute) !== value)
                    node.setAttribute(attribute, value);
            }
            function children(element) {
                return Array.from(element.childNodes);
            }
            function claim_element(nodes, name, attributes, svg) {
                for (let i = 0; i < nodes.length; i += 1) {
                    const node = nodes[i];
                    if (node.nodeName === name) {
                        let j = 0;
                        const remove = [];
                        while (j < node.attributes.length) {
                            const attribute = node.attributes[j++];
                            if (!attributes[attribute.name]) {
                                remove.push(attribute.name);
                            }
                        }
                        for (let k = 0; k < remove.length; k++) {
                            node.removeAttribute(remove[k]);
                        }
                        return nodes.splice(i, 1)[0];
                    }
                }
                return svg ? svg_element(name) : element(name);
            }
            function claim_text(nodes, data) {
                for (let i = 0; i < nodes.length; i += 1) {
                    const node = nodes[i];
                    if (node.nodeType === 3) {
                        node.data = '' + data;
                        return nodes.splice(i, 1)[0];
                    }
                }
                return text(data);
            }
            function claim_space(nodes) {
                return claim_text(nodes, ' ');
            }
            function custom_event(type, detail) {
                const e = document.createEvent('CustomEvent');
                e.initCustomEvent(type, false, false, detail);
                return e;
            }

            let current_component;
            function set_current_component(component) {
                current_component = component;
            }

            const dirty_components = [];
            const binding_callbacks = [];
            const render_callbacks = [];
            const flush_callbacks = [];
            const resolved_promise = Promise.resolve();
            let update_scheduled = false;
            function schedule_update() {
                if (!update_scheduled) {
                    update_scheduled = true;
                    resolved_promise.then(flush);
                }
            }
            function add_render_callback(fn) {
                render_callbacks.push(fn);
            }
            let flushing = false;
            const seen_callbacks = new Set();
            function flush() {
                if (flushing)
                    return;
                flushing = true;
                do {
                    // first, call beforeUpdate functions
                    // and update components
                    for (let i = 0; i < dirty_components.length; i += 1) {
                        const component = dirty_components[i];
                        set_current_component(component);
                        update(component.$$);
                    }
                    dirty_components.length = 0;
                    while (binding_callbacks.length)
                        binding_callbacks.pop()();
                    // then, once components are updated, call
                    // afterUpdate functions. This may cause
                    // subsequent updates...
                    for (let i = 0; i < render_callbacks.length; i += 1) {
                        const callback = render_callbacks[i];
                        if (!seen_callbacks.has(callback)) {
                            // ...so guard against infinite loops
                            seen_callbacks.add(callback);
                            callback();
                        }
                    }
                    render_callbacks.length = 0;
                } while (dirty_components.length);
                while (flush_callbacks.length) {
                    flush_callbacks.pop()();
                }
                update_scheduled = false;
                flushing = false;
                seen_callbacks.clear();
            }
            function update($$) {
                if ($$.fragment !== null) {
                    $$.update();
                    run_all($$.before_update);
                    const dirty = $$.dirty;
                    $$.dirty = [-1];
                    $$.fragment && $$.fragment.p($$.ctx, dirty);
                    $$.after_update.forEach(add_render_callback);
                }
            }
            const outroing = new Set();
            function transition_in(block, local) {
                if (block && block.i) {
                    outroing.delete(block);
                    block.i(local);
                }
            }
            function mount_component(component, target, anchor) {
                const { fragment, on_mount, on_destroy, after_update } = component.$$;
                fragment && fragment.m(target, anchor);
                // onMount happens before the initial afterUpdate
                add_render_callback(() => {
                    const new_on_destroy = on_mount.map(run).filter(is_function);
                    if (on_destroy) {
                        on_destroy.push(...new_on_destroy);
                    }
                    else {
                        // Edge case - component was destroyed immediately,
                        // most likely as a result of a binding initialising
                        run_all(new_on_destroy);
                    }
                    component.$$.on_mount = [];
                });
                after_update.forEach(add_render_callback);
            }
            function destroy_component(component, detaching) {
                const $$ = component.$$;
                if ($$.fragment !== null) {
                    run_all($$.on_destroy);
                    $$.fragment && $$.fragment.d(detaching);
                    // TODO null out other refs, including component.$$ (but need to
                    // preserve final state?)
                    $$.on_destroy = $$.fragment = null;
                    $$.ctx = [];
                }
            }
            function make_dirty(component, i) {
                if (component.$$.dirty[0] === -1) {
                    dirty_components.push(component);
                    schedule_update();
                    component.$$.dirty.fill(0);
                }
                component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
            }
            function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
                const parent_component = current_component;
                set_current_component(component);
                const prop_values = options.props || {};
                const $$ = component.$$ = {
                    fragment: null,
                    ctx: null,
                    // state
                    props,
                    update: noop,
                    not_equal,
                    bound: blank_object(),
                    // lifecycle
                    on_mount: [],
                    on_destroy: [],
                    before_update: [],
                    after_update: [],
                    context: new Map(parent_component ? parent_component.$$.context : []),
                    // everything else
                    callbacks: blank_object(),
                    dirty
                };
                let ready = false;
                $$.ctx = instance
                    ? instance(component, prop_values, (i, ret, ...rest) => {
                        const value = rest.length ? rest[0] : ret;
                        if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                            if ($$.bound[i])
                                $$.bound[i](value);
                            if (ready)
                                make_dirty(component, i);
                        }
                        return ret;
                    })
                    : [];
                $$.update();
                ready = true;
                run_all($$.before_update);
                // `false` as a special case of no DOM component
                $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
                if (options.target) {
                    if (options.hydrate) {
                        const nodes = children(options.target);
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        $$.fragment && $$.fragment.l(nodes);
                        nodes.forEach(detach);
                    }
                    else {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        $$.fragment && $$.fragment.c();
                    }
                    if (options.intro)
                        transition_in(component.$$.fragment);
                    mount_component(component, options.target, options.anchor);
                    flush();
                }
                set_current_component(parent_component);
            }
            class SvelteComponent {
                $destroy() {
                    destroy_component(this, 1);
                    this.$destroy = noop;
                }
                $on(type, callback) {
                    const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
                    callbacks.push(callback);
                    return () => {
                        const index = callbacks.indexOf(callback);
                        if (index !== -1)
                            callbacks.splice(index, 1);
                    };
                }
                $set() {
                    // overridden by instance, if it has props
                }
            }

            function dispatch_dev(type, detail) {
                document.dispatchEvent(custom_event(type, Object.assign({ version: '3.24.0' }, detail)));
            }
            function append_dev(target, node) {
                dispatch_dev("SvelteDOMInsert", { target, node });
                append(target, node);
            }
            function insert_dev(target, node, anchor) {
                dispatch_dev("SvelteDOMInsert", { target, node, anchor });
                insert(target, node, anchor);
            }
            function detach_dev(node) {
                dispatch_dev("SvelteDOMRemove", { node });
                detach(node);
            }
            function attr_dev(node, attribute, value) {
                attr(node, attribute, value);
                if (value == null)
                    dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
                else
                    dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
            }
            function validate_slots(name, slot, keys) {
                for (const slot_key of Object.keys(slot)) {
                    if (!~keys.indexOf(slot_key)) {
                        console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
                    }
                }
            }
            class SvelteComponentDev extends SvelteComponent {
                constructor(options) {
                    if (!options || (!options.target && !options.$$inline)) {
                        throw new Error(`'target' is a required option`);
                    }
                    super();
                }
                $destroy() {
                    super.$destroy();
                    this.$destroy = () => {
                        console.warn(`Component was already destroyed`); // eslint-disable-line no-console
                    };
                }
                $capture_state() { }
                $inject_state() { }
            }

            /* src/components/Sections/Sponsors.svelte generated by Svelte v3.26.0 */

            const file = "src/components/Sections/Sponsors.svelte";

            function create_fragment(ctx) {
            	let div7;
            	let div6;
            	let h2;
            	let t0;
            	let t1;
            	let div1;
            	let a0;
            	let img0;
            	let img0_src_value;
            	let t2;
            	let a1;
            	let img1;
            	let img1_src_value;
            	let t3;
            	let div0;
            	let span0;
            	let t4;
            	let t5;
            	let div5;
            	let a2;
            	let img2;
            	let img2_src_value;
            	let t6;
            	let a3;
            	let img3;
            	let img3_src_value;
            	let t7;
            	let div2;
            	let span1;
            	let t8;
            	let t9;
            	let div3;
            	let span2;
            	let t10;
            	let t11;
            	let div4;
            	let span3;
            	let t12;
            	let t13;
            	let p;
            	let t14;
            	let a4;
            	let t15;
            	let t16;

            	const block = {
            		c: function create() {
            			div7 = element("div");
            			div6 = element("div");
            			h2 = element("h2");
            			t0 = text("SPONSORED BY*");
            			t1 = space();
            			div1 = element("div");
            			a0 = element("a");
            			img0 = element("img");
            			t2 = space();
            			a1 = element("a");
            			img1 = element("img");
            			t3 = space();
            			div0 = element("div");
            			span0 = element("span");
            			t4 = text("Sponsor spot open");
            			t5 = space();
            			div5 = element("div");
            			a2 = element("a");
            			img2 = element("img");
            			t6 = space();
            			a3 = element("a");
            			img3 = element("img");
            			t7 = space();
            			div2 = element("div");
            			span1 = element("span");
            			t8 = text("Sponsor spot open");
            			t9 = space();
            			div3 = element("div");
            			span2 = element("span");
            			t10 = text("Sponsor spot open");
            			t11 = space();
            			div4 = element("div");
            			span3 = element("span");
            			t12 = text("Sponsor spot open");
            			t13 = space();
            			p = element("p");
            			t14 = text("*We’re looking for more sponsors for the event. Any financial backing will\n      be used to support the event and further development of Svelte itself. ");
            			a4 = element("a");
            			t15 = text("Get in touch");
            			t16 = text(".");
            			this.h();
            		},
            		l: function claim(nodes) {
            			div7 = claim_element(nodes, "DIV", { class: true, id: true });
            			var div7_nodes = children(div7);
            			div6 = claim_element(div7_nodes, "DIV", { class: true });
            			var div6_nodes = children(div6);
            			h2 = claim_element(div6_nodes, "H2", { class: true });
            			var h2_nodes = children(h2);
            			t0 = claim_text(h2_nodes, "SPONSORED BY*");
            			h2_nodes.forEach(detach_dev);
            			t1 = claim_space(div6_nodes);
            			div1 = claim_element(div6_nodes, "DIV", { class: true });
            			var div1_nodes = children(div1);

            			a0 = claim_element(div1_nodes, "A", {
            				href: true,
            				rel: true,
            				target: true,
            				class: true,
            				"data-tooltip": true
            			});

            			var a0_nodes = children(a0);
            			img0 = claim_element(a0_nodes, "IMG", { src: true, alt: true, class: true });
            			a0_nodes.forEach(detach_dev);
            			t2 = claim_space(div1_nodes);

            			a1 = claim_element(div1_nodes, "A", {
            				href: true,
            				rel: true,
            				target: true,
            				class: true
            			});

            			var a1_nodes = children(a1);
            			img1 = claim_element(a1_nodes, "IMG", { src: true, alt: true, class: true });
            			a1_nodes.forEach(detach_dev);
            			t3 = claim_space(div1_nodes);
            			div0 = claim_element(div1_nodes, "DIV", { class: true });
            			var div0_nodes = children(div0);
            			span0 = claim_element(div0_nodes, "SPAN", { class: true });
            			var span0_nodes = children(span0);
            			t4 = claim_text(span0_nodes, "Sponsor spot open");
            			span0_nodes.forEach(detach_dev);
            			div0_nodes.forEach(detach_dev);
            			div1_nodes.forEach(detach_dev);
            			t5 = claim_space(div6_nodes);
            			div5 = claim_element(div6_nodes, "DIV", { class: true });
            			var div5_nodes = children(div5);

            			a2 = claim_element(div5_nodes, "A", {
            				href: true,
            				rel: true,
            				target: true,
            				class: true,
            				"data-tooltip": true
            			});

            			var a2_nodes = children(a2);
            			img2 = claim_element(a2_nodes, "IMG", { src: true, alt: true, class: true });
            			a2_nodes.forEach(detach_dev);
            			t6 = claim_space(div5_nodes);

            			a3 = claim_element(div5_nodes, "A", {
            				href: true,
            				rel: true,
            				target: true,
            				class: true,
            				"data-tooltip": true
            			});

            			var a3_nodes = children(a3);
            			img3 = claim_element(a3_nodes, "IMG", { src: true, alt: true, class: true });
            			a3_nodes.forEach(detach_dev);
            			t7 = claim_space(div5_nodes);
            			div2 = claim_element(div5_nodes, "DIV", { class: true });
            			var div2_nodes = children(div2);
            			span1 = claim_element(div2_nodes, "SPAN", { class: true });
            			var span1_nodes = children(span1);
            			t8 = claim_text(span1_nodes, "Sponsor spot open");
            			span1_nodes.forEach(detach_dev);
            			div2_nodes.forEach(detach_dev);
            			t9 = claim_space(div5_nodes);
            			div3 = claim_element(div5_nodes, "DIV", { class: true });
            			var div3_nodes = children(div3);
            			span2 = claim_element(div3_nodes, "SPAN", { class: true });
            			var span2_nodes = children(span2);
            			t10 = claim_text(span2_nodes, "Sponsor spot open");
            			span2_nodes.forEach(detach_dev);
            			div3_nodes.forEach(detach_dev);
            			t11 = claim_space(div5_nodes);
            			div4 = claim_element(div5_nodes, "DIV", { class: true });
            			var div4_nodes = children(div4);
            			span3 = claim_element(div4_nodes, "SPAN", { class: true });
            			var span3_nodes = children(span3);
            			t12 = claim_text(span3_nodes, "Sponsor spot open");
            			span3_nodes.forEach(detach_dev);
            			div4_nodes.forEach(detach_dev);
            			div5_nodes.forEach(detach_dev);
            			t13 = claim_space(div6_nodes);
            			p = claim_element(div6_nodes, "P", { class: true });
            			var p_nodes = children(p);
            			t14 = claim_text(p_nodes, "*We’re looking for more sponsors for the event. Any financial backing will\n      be used to support the event and further development of Svelte itself. ");
            			a4 = claim_element(p_nodes, "A", { href: true });
            			var a4_nodes = children(a4);
            			t15 = claim_text(a4_nodes, "Get in touch");
            			a4_nodes.forEach(detach_dev);
            			t16 = claim_text(p_nodes, ".");
            			p_nodes.forEach(detach_dev);
            			div6_nodes.forEach(detach_dev);
            			div7_nodes.forEach(detach_dev);
            			this.h();
            		},
            		h: function hydrate() {
            			attr_dev(h2, "class", "svelte-5sn1n8");
            			add_location(h2, file, 133, 4, 2729);
            			if (img0.src !== (img0_src_value = "/images/sponsors/aws.svg")) attr_dev(img0, "src", img0_src_value);
            			attr_dev(img0, "alt", "");
            			attr_dev(img0, "class", "svelte-5sn1n8");
            			add_location(img0, file, 141, 8, 3035);
            			attr_dev(a0, "href", "https://aws.amazon.com/amplify/");
            			attr_dev(a0, "rel", "noopener noreferrer");
            			attr_dev(a0, "target", "_blank");
            			attr_dev(a0, "class", "sponsor svelte-5sn1n8");
            			attr_dev(a0, "data-tooltip", "AWS Amplify – The fastest, easiest way to develop mobile and web apps that scale");
            			add_location(a0, file, 135, 6, 2790);
            			if (img1.src !== (img1_src_value = "/images/sponsors/b3coderight.svg")) attr_dev(img1, "src", img1_src_value);
            			attr_dev(img1, "alt", "");
            			attr_dev(img1, "class", "svelte-5sn1n8");
            			add_location(img1, file, 148, 8, 3232);
            			attr_dev(a1, "href", "https://www.coderight.se");
            			attr_dev(a1, "rel", "noopener noreferrer");
            			attr_dev(a1, "target", "_blank");
            			attr_dev(a1, "class", "sponsor svelte-5sn1n8");
            			add_location(a1, file, 143, 6, 3098);
            			attr_dev(span0, "class", "svelte-5sn1n8");
            			add_location(span0, file, 150, 27, 3324);
            			attr_dev(div0, "class", "sponsor svelte-5sn1n8");
            			add_location(div0, file, 150, 6, 3303);
            			attr_dev(div1, "class", "gold sponsors svelte-5sn1n8");
            			add_location(div1, file, 134, 4, 2756);
            			if (img2.src !== (img2_src_value = "/images/sponsors/oasis.svg")) attr_dev(img2, "src", img2_src_value);
            			attr_dev(img2, "alt", "");
            			attr_dev(img2, "class", "svelte-5sn1n8");
            			add_location(img2, file, 159, 8, 3705);
            			attr_dev(a2, "href", "https://oasisdigital.com");
            			attr_dev(a2, "rel", "noopener noreferrer");
            			attr_dev(a2, "target", "_blank");
            			attr_dev(a2, "class", "sponsor svelte-5sn1n8");
            			attr_dev(a2, "data-tooltip", "Oasis Digital delivers advanced software product development and training services, focused on web technology and full stack solutions.");
            			add_location(a2, file, 153, 6, 3412);
            			if (img3.src !== (img3_src_value = "/images/sponsors/humancontent.svg")) attr_dev(img3, "src", img3_src_value);
            			attr_dev(img3, "alt", "");
            			attr_dev(img3, "class", "svelte-5sn1n8");
            			add_location(img3, file, 167, 8, 4134);
            			attr_dev(a3, "href", "https://www.humancontent.nl");
            			attr_dev(a3, "rel", "noopener noreferrer");
            			attr_dev(a3, "target", "_blank");
            			attr_dev(a3, "class", "sponsor svelte-5sn1n8");
            			attr_dev(a3, "data-tooltip", "Whether it is a website, a business application or a mobile app; we take care of the entire process, from the first consultation to an end product with maximum added value for the customer and end users.");
            			add_location(a3, file, 161, 6, 3770);
            			attr_dev(span1, "class", "svelte-5sn1n8");
            			add_location(span1, file, 169, 27, 4227);
            			attr_dev(div2, "class", "sponsor svelte-5sn1n8");
            			add_location(div2, file, 169, 6, 4206);
            			attr_dev(span2, "class", "svelte-5sn1n8");
            			add_location(span2, file, 170, 27, 4291);
            			attr_dev(div3, "class", "sponsor svelte-5sn1n8");
            			add_location(div3, file, 170, 6, 4270);
            			attr_dev(span3, "class", "svelte-5sn1n8");
            			add_location(span3, file, 171, 27, 4355);
            			attr_dev(div4, "class", "sponsor svelte-5sn1n8");
            			add_location(div4, file, 171, 6, 4334);
            			attr_dev(div5, "class", "silver sponsors svelte-5sn1n8");
            			add_location(div5, file, 152, 4, 3376);
            			attr_dev(a4, "href", "mailto:sponsors@sveltesociety.dev");
            			add_location(a4, file, 175, 77, 4582);
            			attr_dev(p, "class", "info svelte-5sn1n8");
            			add_location(p, file, 173, 4, 4407);
            			attr_dev(div6, "class", "container svelte-5sn1n8");
            			add_location(div6, file, 132, 2, 2701);
            			attr_dev(div7, "class", "background svelte-5sn1n8");
            			attr_dev(div7, "id", "sponsors");
            			add_location(div7, file, 131, 0, 2660);
            		},
            		m: function mount(target, anchor) {
            			insert_dev(target, div7, anchor);
            			append_dev(div7, div6);
            			append_dev(div6, h2);
            			append_dev(h2, t0);
            			append_dev(div6, t1);
            			append_dev(div6, div1);
            			append_dev(div1, a0);
            			append_dev(a0, img0);
            			append_dev(div1, t2);
            			append_dev(div1, a1);
            			append_dev(a1, img1);
            			append_dev(div1, t3);
            			append_dev(div1, div0);
            			append_dev(div0, span0);
            			append_dev(span0, t4);
            			append_dev(div6, t5);
            			append_dev(div6, div5);
            			append_dev(div5, a2);
            			append_dev(a2, img2);
            			append_dev(div5, t6);
            			append_dev(div5, a3);
            			append_dev(a3, img3);
            			append_dev(div5, t7);
            			append_dev(div5, div2);
            			append_dev(div2, span1);
            			append_dev(span1, t8);
            			append_dev(div5, t9);
            			append_dev(div5, div3);
            			append_dev(div3, span2);
            			append_dev(span2, t10);
            			append_dev(div5, t11);
            			append_dev(div5, div4);
            			append_dev(div4, span3);
            			append_dev(span3, t12);
            			append_dev(div6, t13);
            			append_dev(div6, p);
            			append_dev(p, t14);
            			append_dev(p, a4);
            			append_dev(a4, t15);
            			append_dev(p, t16);
            		},
            		p: noop,
            		i: noop,
            		o: noop,
            		d: function destroy(detaching) {
            			if (detaching) detach_dev(div7);
            		}
            	};

            	dispatch_dev("SvelteRegisterBlock", {
            		block,
            		id: create_fragment.name,
            		type: "component",
            		source: "",
            		ctx
            	});

            	return block;
            }

            function instance($$self, $$props) {
            	let { $$slots: slots = {}, $$scope } = $$props;
            	validate_slots("Sponsors", slots, []);
            	const writable_props = [];

            	Object.keys($$props).forEach(key => {
            		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Sponsors> was created with unknown prop '${key}'`);
            	});

            	return [];
            }

            class Sponsors extends SvelteComponentDev {
            	constructor(options) {
            		super(options);
            		init(this, options, instance, create_fragment, not_equal, {});

            		dispatch_dev("SvelteRegisterComponent", {
            			component: this,
            			tagName: "Sponsors",
            			options,
            			id: create_fragment.name
            		});
            	}
            } exports('default', Sponsors);

        }
    };
});
//# sourceMappingURL=entrySponsors.js.map
