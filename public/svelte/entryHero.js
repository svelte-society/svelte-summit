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
            function destroy_each(iterations, detaching) {
                for (let i = 0; i < iterations.length; i += 1) {
                    if (iterations[i])
                        iterations[i].d(detaching);
                }
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
            function empty() {
                return text('');
            }
            function listen(node, event, handler, options) {
                node.addEventListener(event, handler, options);
                return () => node.removeEventListener(event, handler, options);
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
            function toggle_class(element, name, toggle) {
                element.classList[toggle ? 'add' : 'remove'](name);
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
            let outros;
            function transition_in(block, local) {
                if (block && block.i) {
                    outroing.delete(block);
                    block.i(local);
                }
            }
            function transition_out(block, local, detach, callback) {
                if (block && block.o) {
                    if (outroing.has(block))
                        return;
                    outroing.add(block);
                    outros.c.push(() => {
                        outroing.delete(block);
                        if (callback) {
                            if (detach)
                                block.d(1);
                            callback();
                        }
                    });
                    block.o(local);
                }
            }
            function create_component(block) {
                block && block.c();
            }
            function claim_component(block, parent_nodes) {
                block && block.l(parent_nodes);
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
            function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
                const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
                if (has_prevent_default)
                    modifiers.push('preventDefault');
                if (has_stop_propagation)
                    modifiers.push('stopPropagation');
                dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
                const dispose = listen(node, event, handler, options);
                return () => {
                    dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
                    dispose();
                };
            }
            function attr_dev(node, attribute, value) {
                attr(node, attribute, value);
                if (value == null)
                    dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
                else
                    dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
            }
            function set_data_dev(text, data) {
                data = '' + data;
                if (text.wholeText === data)
                    return;
                dispatch_dev("SvelteDOMSetData", { node: text, data });
                text.data = data;
            }
            function validate_each_argument(arg) {
                if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
                    let msg = '{#each} only iterates over array-like objects.';
                    if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                        msg += ' You can use a spread to convert this iterable into an array.';
                    }
                    throw new Error(msg);
                }
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

            /* src/components/Hero/Background/SVG/BackMountain.svelte generated by Svelte v3.26.0 */

            const file = "src/components/Hero/Background/SVG/BackMountain.svelte";

            function create_fragment(ctx) {
            	let svg;
            	let path;

            	const block = {
            		c: function create() {
            			svg = svg_element("svg");
            			path = svg_element("path");
            			this.h();
            		},
            		l: function claim(nodes) {
            			svg = claim_element(
            				nodes,
            				"svg",
            				{
            					viewBox: true,
            					fill: true,
            					xmlns: true,
            					class: true
            				},
            				1
            			);

            			var svg_nodes = children(svg);
            			path = claim_element(svg_nodes, "path", { d: true, fill: true }, 1);
            			children(path).forEach(detach_dev);
            			svg_nodes.forEach(detach_dev);
            			this.h();
            		},
            		h: function hydrate() {
            			attr_dev(path, "d", "M132.873 91.4783C132.873 91.4783 55.3632 236.986 0 289H1411.5L1110\n    124.5L834.5 76.5L641.5 0L412.782 45.7301C349.277 64.468 132.873 91.4783\n    132.873 91.4783Z");
            			attr_dev(path, "fill", /*color*/ ctx[0]);
            			add_location(path, file, 33, 2, 507);
            			attr_dev(svg, "viewBox", "0 0 1412 289");
            			attr_dev(svg, "fill", "none");
            			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
            			attr_dev(svg, "class", "svelte-gm69cn");
            			add_location(svg, file, 32, 0, 429);
            		},
            		m: function mount(target, anchor) {
            			insert_dev(target, svg, anchor);
            			append_dev(svg, path);
            		},
            		p: function update(ctx, [dirty]) {
            			if (dirty & /*color*/ 1) {
            				attr_dev(path, "fill", /*color*/ ctx[0]);
            			}
            		},
            		i: noop,
            		o: noop,
            		d: function destroy(detaching) {
            			if (detaching) detach_dev(svg);
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

            function instance($$self, $$props, $$invalidate) {
            	let { $$slots: slots = {}, $$scope } = $$props;
            	validate_slots("BackMountain", slots, []);
            	let { type = "morning" } = $$props;
            	let color;

            	switch (type) {
            		case "morning":
            			color = "#C4E4E9";
            			break;
            		case "evening":
            			color = "#D5BCBA";
            			break;
            		case "night":
            			color = "#12262A";
            			break;
            	}

            	const writable_props = ["type"];

            	Object.keys($$props).forEach(key => {
            		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<BackMountain> was created with unknown prop '${key}'`);
            	});

            	$$self.$$set = $$props => {
            		if ("type" in $$props) $$invalidate(1, type = $$props.type);
            	};

            	$$self.$capture_state = () => ({ type, color });

            	$$self.$inject_state = $$props => {
            		if ("type" in $$props) $$invalidate(1, type = $$props.type);
            		if ("color" in $$props) $$invalidate(0, color = $$props.color);
            	};

            	if ($$props && "$$inject" in $$props) {
            		$$self.$inject_state($$props.$$inject);
            	}

            	return [color, type];
            }

            class BackMountain extends SvelteComponentDev {
            	constructor(options) {
            		super(options);
            		init(this, options, instance, create_fragment, not_equal, { type: 1 });

            		dispatch_dev("SvelteRegisterComponent", {
            			component: this,
            			tagName: "BackMountain",
            			options,
            			id: create_fragment.name
            		});
            	}

            	get type() {
            		throw new Error("<BackMountain>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
            	}

            	set type(value) {
            		throw new Error("<BackMountain>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
            	}
            }

            /* src/components/Hero/Background/SVG/FrontMountain.svelte generated by Svelte v3.26.0 */

            const file$1 = "src/components/Hero/Background/SVG/FrontMountain.svelte";

            function create_fragment$1(ctx) {
            	let svg;
            	let path0;
            	let path1;
            	let path2;

            	const block = {
            		c: function create() {
            			svg = svg_element("svg");
            			path0 = svg_element("path");
            			path1 = svg_element("path");
            			path2 = svg_element("path");
            			this.h();
            		},
            		l: function claim(nodes) {
            			svg = claim_element(
            				nodes,
            				"svg",
            				{
            					viewBox: true,
            					fill: true,
            					xmlns: true,
            					class: true
            				},
            				1
            			);

            			var svg_nodes = children(svg);
            			path0 = claim_element(svg_nodes, "path", { d: true, fill: true }, 1);
            			children(path0).forEach(detach_dev);
            			path1 = claim_element(svg_nodes, "path", { opacity: true, d: true, fill: true }, 1);
            			children(path1).forEach(detach_dev);
            			path2 = claim_element(svg_nodes, "path", { d: true, fill: true }, 1);
            			children(path2).forEach(detach_dev);
            			svg_nodes.forEach(detach_dev);
            			this.h();
            		},
            		h: function hydrate() {
            			attr_dev(path0, "d", "M96.5 210.5C96.5 210.5 40.2079 449.549 0 535H910L724.63 410.804L581.832\n    318.452L404.444 0L299.786 135.342C253.665 166.126 96.5 210.5 96.5 210.5Z");
            			attr_dev(path0, "fill", /*color*/ ctx[0]);
            			add_location(path0, file$1, 33, 2, 505);
            			attr_dev(path1, "opacity", "0.1");
            			attr_dev(path1, "d", "M408.49 230.931L479 137L431.302 230.931L278.357 345.101L255.027\n    534H170L242.065 345.101L408.49 230.931Z");
            			attr_dev(path1, "fill", "black");
            			add_location(path1, file$1, 37, 2, 690);
            			attr_dev(path2, "d", "M509.5 418L576 312L530 418L576 496L615 535H576L530 496L509.5 418Z");
            			attr_dev(path2, "fill", "#C0CBCD");
            			add_location(path2, file$1, 42, 2, 852);
            			attr_dev(svg, "viewBox", "0 0 910 535");
            			attr_dev(svg, "fill", "none");
            			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
            			attr_dev(svg, "class", "svelte-1n305uu");
            			add_location(svg, file$1, 32, 0, 428);
            		},
            		m: function mount(target, anchor) {
            			insert_dev(target, svg, anchor);
            			append_dev(svg, path0);
            			append_dev(svg, path1);
            			append_dev(svg, path2);
            		},
            		p: function update(ctx, [dirty]) {
            			if (dirty & /*color*/ 1) {
            				attr_dev(path0, "fill", /*color*/ ctx[0]);
            			}
            		},
            		i: noop,
            		o: noop,
            		d: function destroy(detaching) {
            			if (detaching) detach_dev(svg);
            		}
            	};

            	dispatch_dev("SvelteRegisterBlock", {
            		block,
            		id: create_fragment$1.name,
            		type: "component",
            		source: "",
            		ctx
            	});

            	return block;
            }

            function instance$1($$self, $$props, $$invalidate) {
            	let { $$slots: slots = {}, $$scope } = $$props;
            	validate_slots("FrontMountain", slots, []);
            	let { type = "morning" } = $$props;
            	let color;

            	switch (type) {
            		case "morning":
            			color = "#D5E2E4";
            			break;
            		case "evening":
            			color = "#F5E6D4";
            			break;
            		case "night":
            			color = "#D5E2E4";
            			break;
            	}

            	const writable_props = ["type"];

            	Object.keys($$props).forEach(key => {
            		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FrontMountain> was created with unknown prop '${key}'`);
            	});

            	$$self.$$set = $$props => {
            		if ("type" in $$props) $$invalidate(1, type = $$props.type);
            	};

            	$$self.$capture_state = () => ({ type, color });

            	$$self.$inject_state = $$props => {
            		if ("type" in $$props) $$invalidate(1, type = $$props.type);
            		if ("color" in $$props) $$invalidate(0, color = $$props.color);
            	};

            	if ($$props && "$$inject" in $$props) {
            		$$self.$inject_state($$props.$$inject);
            	}

            	return [color, type];
            }

            class FrontMountain extends SvelteComponentDev {
            	constructor(options) {
            		super(options);
            		init(this, options, instance$1, create_fragment$1, not_equal, { type: 1 });

            		dispatch_dev("SvelteRegisterComponent", {
            			component: this,
            			tagName: "FrontMountain",
            			options,
            			id: create_fragment$1.name
            		});
            	}

            	get type() {
            		throw new Error("<FrontMountain>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
            	}

            	set type(value) {
            		throw new Error("<FrontMountain>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
            	}
            }

            /* src/components/Hero/Background/SVG/MidMountain.svelte generated by Svelte v3.26.0 */

            const file$2 = "src/components/Hero/Background/SVG/MidMountain.svelte";

            function create_fragment$2(ctx) {
            	let svg;
            	let path0;
            	let mask;
            	let path1;
            	let g;
            	let path2;
            	let path3;
            	let path4;

            	const block = {
            		c: function create() {
            			svg = svg_element("svg");
            			path0 = svg_element("path");
            			mask = svg_element("mask");
            			path1 = svg_element("path");
            			g = svg_element("g");
            			path2 = svg_element("path");
            			path3 = svg_element("path");
            			path4 = svg_element("path");
            			this.h();
            		},
            		l: function claim(nodes) {
            			svg = claim_element(
            				nodes,
            				"svg",
            				{
            					viewBox: true,
            					fill: true,
            					xmlns: true,
            					class: true
            				},
            				1
            			);

            			var svg_nodes = children(svg);
            			path0 = claim_element(svg_nodes, "path", { d: true, fill: true }, 1);
            			children(path0).forEach(detach_dev);

            			mask = claim_element(
            				svg_nodes,
            				"mask",
            				{
            					id: true,
            					"mask-type": true,
            					maskUnits: true,
            					x: true,
            					y: true,
            					width: true,
            					height: true
            				},
            				1
            			);

            			var mask_nodes = children(mask);
            			path1 = claim_element(mask_nodes, "path", { d: true, fill: true }, 1);
            			children(path1).forEach(detach_dev);
            			mask_nodes.forEach(detach_dev);
            			g = claim_element(svg_nodes, "g", { mask: true }, 1);
            			var g_nodes = children(g);
            			path2 = claim_element(g_nodes, "path", { opacity: true, d: true, fill: true }, 1);
            			children(path2).forEach(detach_dev);
            			path3 = claim_element(g_nodes, "path", { opacity: true, d: true, fill: true }, 1);
            			children(path3).forEach(detach_dev);
            			path4 = claim_element(g_nodes, "path", { d: true, fill: true }, 1);
            			children(path4).forEach(detach_dev);
            			g_nodes.forEach(detach_dev);
            			svg_nodes.forEach(detach_dev);
            			this.h();
            		},
            		h: function hydrate() {
            			attr_dev(path0, "d", "M132.873 240.924C132.873 240.924 55.3632 539.33 0 646H1253L997.759\n    490.964L770 240.924L599.5 0L412.782 147.104C349.277 185.531 132.873 240.924\n    132.873 240.924Z");
            			attr_dev(path0, "fill", /*color*/ ctx[0]);
            			add_location(path0, file$2, 35, 2, 688);
            			attr_dev(path1, "d", "M132.873 240.924C132.873 240.924 55.3632 539.33 0 646H1253L997.759\n      490.964L770 240.924L599.5 0L412.782 147.104C349.277 185.531 132.873\n      240.924 132.873 240.924Z");
            			attr_dev(path1, "fill", "#B9D7DB");
            			add_location(path1, file$2, 48, 4, 1025);
            			attr_dev(mask, "id", "mask0");
            			attr_dev(mask, "mask-type", "alpha");
            			attr_dev(mask, "maskUnits", "userSpaceOnUse");
            			attr_dev(mask, "x", "0");
            			attr_dev(mask, "y", "0");
            			attr_dev(mask, "width", "1253");
            			attr_dev(mask, "height", "646");
            			add_location(mask, file$2, 40, 2, 892);
            			attr_dev(path2, "opacity", "0.1");
            			attr_dev(path2, "d", "M751.669 245.016L711.809 157L733.011 254.713L739.372 313.639L742.753\n      521L875.809 649H929.809L778.809 521L760.998 294.94L751.669 245.016Z");
            			attr_dev(path2, "fill", "black");
            			add_location(path2, file$2, 55, 4, 1276);
            			attr_dev(path3, "opacity", "0.05");
            			attr_dev(path3, "d", "M345.918 617.142L289.207 660.194L357.029 635.279L395.231 612.383L509.48\n      613.488L669.807 414L499.932 590.006L380.419 598.519L345.918 617.142Z");
            			attr_dev(path3, "fill", "black");
            			add_location(path3, file$2, 60, 4, 1481);
            			attr_dev(path4, "d", "M413 41.5222L522.5 94.8728H584.5H630L716.5 77.3062L785 -17.684L611.5\n      -140L502 -100.963L413 41.5222Z");
            			attr_dev(path4, "fill", "white");
            			add_location(path4, file$2, 65, 4, 1691);
            			attr_dev(g, "mask", "url(#mask0)");
            			add_location(g, file$2, 54, 2, 1249);
            			attr_dev(svg, "viewBox", "0 0 1253 646");
            			attr_dev(svg, "fill", "none");
            			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
            			attr_dev(svg, "class", "svelte-1n9lvnt");
            			add_location(svg, file$2, 34, 0, 610);
            		},
            		m: function mount(target, anchor) {
            			insert_dev(target, svg, anchor);
            			append_dev(svg, path0);
            			append_dev(svg, mask);
            			append_dev(mask, path1);
            			append_dev(svg, g);
            			append_dev(g, path2);
            			append_dev(g, path3);
            			append_dev(g, path4);
            		},
            		p: function update(ctx, [dirty]) {
            			if (dirty & /*color*/ 1) {
            				attr_dev(path0, "fill", /*color*/ ctx[0]);
            			}
            		},
            		i: noop,
            		o: noop,
            		d: function destroy(detaching) {
            			if (detaching) detach_dev(svg);
            		}
            	};

            	dispatch_dev("SvelteRegisterBlock", {
            		block,
            		id: create_fragment$2.name,
            		type: "component",
            		source: "",
            		ctx
            	});

            	return block;
            }

            function instance$2($$self, $$props, $$invalidate) {
            	let { $$slots: slots = {}, $$scope } = $$props;
            	validate_slots("MidMountain", slots, []);
            	let { type = "morning" } = $$props;
            	let color;

            	switch (type) {
            		case "morning":
            			color = "#B9D7DB";
            			break;
            		case "evening":
            			color = "#F2DBBF";
            			break;
            		case "night":
            			color = "#F2F5F5";
            			break;
            	}

            	const writable_props = ["type"];

            	Object.keys($$props).forEach(key => {
            		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MidMountain> was created with unknown prop '${key}'`);
            	});

            	$$self.$$set = $$props => {
            		if ("type" in $$props) $$invalidate(1, type = $$props.type);
            	};

            	$$self.$capture_state = () => ({ type, color });

            	$$self.$inject_state = $$props => {
            		if ("type" in $$props) $$invalidate(1, type = $$props.type);
            		if ("color" in $$props) $$invalidate(0, color = $$props.color);
            	};

            	if ($$props && "$$inject" in $$props) {
            		$$self.$inject_state($$props.$$inject);
            	}

            	return [color, type];
            }

            class MidMountain extends SvelteComponentDev {
            	constructor(options) {
            		super(options);
            		init(this, options, instance$2, create_fragment$2, not_equal, { type: 1 });

            		dispatch_dev("SvelteRegisterComponent", {
            			component: this,
            			tagName: "MidMountain",
            			options,
            			id: create_fragment$2.name
            		});
            	}

            	get type() {
            		throw new Error("<MidMountain>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
            	}

            	set type(value) {
            		throw new Error("<MidMountain>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
            	}
            }

            /* src/components/Hero/Background/SVG/Bears.svelte generated by Svelte v3.26.0 */

            const file$3 = "src/components/Hero/Background/SVG/Bears.svelte";

            function create_fragment$3(ctx) {
            	let svg;
            	let path0;
            	let path1;
            	let path2;
            	let path3;
            	let path4;
            	let path5;

            	const block = {
            		c: function create() {
            			svg = svg_element("svg");
            			path0 = svg_element("path");
            			path1 = svg_element("path");
            			path2 = svg_element("path");
            			path3 = svg_element("path");
            			path4 = svg_element("path");
            			path5 = svg_element("path");
            			this.h();
            		},
            		l: function claim(nodes) {
            			svg = claim_element(
            				nodes,
            				"svg",
            				{
            					width: true,
            					height: true,
            					class: true,
            					viewBox: true,
            					fill: true,
            					xmlns: true
            				},
            				1
            			);

            			var svg_nodes = children(svg);
            			path0 = claim_element(svg_nodes, "path", { d: true, fill: true }, 1);
            			children(path0).forEach(detach_dev);
            			path1 = claim_element(svg_nodes, "path", { d: true, fill: true }, 1);
            			children(path1).forEach(detach_dev);
            			path2 = claim_element(svg_nodes, "path", { d: true, fill: true }, 1);
            			children(path2).forEach(detach_dev);
            			path3 = claim_element(svg_nodes, "path", { d: true, fill: true }, 1);
            			children(path3).forEach(detach_dev);
            			path4 = claim_element(svg_nodes, "path", { d: true, fill: true }, 1);
            			children(path4).forEach(detach_dev);
            			path5 = claim_element(svg_nodes, "path", { d: true, fill: true }, 1);
            			children(path5).forEach(detach_dev);
            			svg_nodes.forEach(detach_dev);
            			this.h();
            		},
            		h: function hydrate() {
            			attr_dev(path0, "d", "M59.1117 0L78.676 2.11327L87.9314 7.4133L88.4841 8.46383L91.4499 9.98178C91.4499 9.98178 91.0099 13.1654 86.9906 12.1148L80.4391 9.95742L74.5988 13.8933L72.1674 21.8028H69.0142L69.0127 13.8859H58.005L55.6268 21.8028H52.4736V10.0689L59.1117 0Z");
            			attr_dev(path0, "fill", "#7B5855");
            			add_location(path0, file$3, 11, 0, 260);
            			attr_dev(path1, "d", "M80.0586 11.2015L76.4883 16.3597L78.466 21.8027H81.6618L80.0586 11.2015Z");
            			attr_dev(path1, "fill", "#7B5855");
            			add_location(path1, file$3, 12, 0, 530);
            			attr_dev(path2, "d", "M61.2466 18.7285L64.4774 14.493L65.6391 21.8026H62.4311L61.2466 18.7285Z");
            			attr_dev(path2, "fill", "#7B5855");
            			add_location(path2, file$3, 13, 0, 630);
            			attr_dev(path3, "d", "M4.76821 6.31155L18.8214 7.82954L25.4696 11.6366L25.8666 12.3912L27.9971 13.4816C27.9971 13.4816 27.681 15.7684 24.7939 15.0138L20.0879 13.4641L15.8927 16.2912L14.1462 21.9727H11.8813L11.8802 16.2859H3.9732L2.26492 21.9727H0V13.5441L4.76821 6.31155Z");
            			attr_dev(path3, "fill", "#7B5855");
            			add_location(path3, file$3, 14, 0, 730);
            			attr_dev(path4, "d", "M19.8146 14.3582L17.25 18.0633L18.6706 21.9732H20.9662L19.8146 14.3582Z");
            			attr_dev(path4, "fill", "#7B5855");
            			add_location(path4, file$3, 15, 0, 1007);
            			attr_dev(path5, "d", "M6.30127 19.7641L8.62199 16.7216L9.45645 21.9722H7.15213L6.30127 19.7641Z");
            			attr_dev(path5, "fill", "#7B5855");
            			add_location(path5, file$3, 16, 0, 1106);
            			attr_dev(svg, "width", "92");
            			attr_dev(svg, "height", "22");
            			attr_dev(svg, "class", "bears-normal svelte-1764xpx");
            			attr_dev(svg, "viewBox", "0 0 92 22");
            			attr_dev(svg, "fill", "none");
            			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
            			add_location(svg, file$3, 10, 0, 143);
            		},
            		m: function mount(target, anchor) {
            			insert_dev(target, svg, anchor);
            			append_dev(svg, path0);
            			append_dev(svg, path1);
            			append_dev(svg, path2);
            			append_dev(svg, path3);
            			append_dev(svg, path4);
            			append_dev(svg, path5);
            		},
            		p: noop,
            		i: noop,
            		o: noop,
            		d: function destroy(detaching) {
            			if (detaching) detach_dev(svg);
            		}
            	};

            	dispatch_dev("SvelteRegisterBlock", {
            		block,
            		id: create_fragment$3.name,
            		type: "component",
            		source: "",
            		ctx
            	});

            	return block;
            }

            function instance$3($$self, $$props) {
            	let { $$slots: slots = {}, $$scope } = $$props;
            	validate_slots("Bears", slots, []);
            	const writable_props = [];

            	Object.keys($$props).forEach(key => {
            		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Bears> was created with unknown prop '${key}'`);
            	});

            	return [];
            }

            class Bears extends SvelteComponentDev {
            	constructor(options) {
            		super(options);
            		init(this, options, instance$3, create_fragment$3, not_equal, {});

            		dispatch_dev("SvelteRegisterComponent", {
            			component: this,
            			tagName: "Bears",
            			options,
            			id: create_fragment$3.name
            		});
            	}
            }

            /* src/components/Hero/Background/SVG/Reflection.svelte generated by Svelte v3.26.0 */

            const file$4 = "src/components/Hero/Background/SVG/Reflection.svelte";

            function create_fragment$4(ctx) {
            	let svg;
            	let path;

            	const block = {
            		c: function create() {
            			svg = svg_element("svg");
            			path = svg_element("path");
            			this.h();
            		},
            		l: function claim(nodes) {
            			svg = claim_element(
            				nodes,
            				"svg",
            				{
            					viewBox: true,
            					fill: true,
            					xmlns: true,
            					class: true
            				},
            				1
            			);

            			var svg_nodes = children(svg);
            			path = claim_element(svg_nodes, "path", { opacity: true, d: true, fill: true }, 1);
            			children(path).forEach(detach_dev);
            			svg_nodes.forEach(detach_dev);
            			this.h();
            		},
            		h: function hydrate() {
            			attr_dev(path, "opacity", "0.1");
            			attr_dev(path, "d", "M1279.08 120.98C1355.41 88.45 1356.62 31.8581 1412\n    0.00012207L-0.000106509 -1.37066e-06C-0.000106509 -1.37066e-06 174.204\n    74.9833 301.607 100.755C405.341 121.738 472.521 111.018 577.204\n    130.154C654.919 144.361 689.633 171.697 770.273 177.01C860.87 182.979\n    935.545 160.477 999.072 149.001C1062.6 137.524 1188.14 159.738 1279.08\n    120.98Z");
            			attr_dev(path, "fill", "#C1DADF");
            			add_location(path, file$4, 13, 2, 254);
            			attr_dev(svg, "viewBox", "0 0 1412 178");
            			attr_dev(svg, "fill", "none");
            			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
            			attr_dev(svg, "class", "svelte-icy12y");
            			add_location(svg, file$4, 12, 0, 176);
            		},
            		m: function mount(target, anchor) {
            			insert_dev(target, svg, anchor);
            			append_dev(svg, path);
            		},
            		p: noop,
            		i: noop,
            		o: noop,
            		d: function destroy(detaching) {
            			if (detaching) detach_dev(svg);
            		}
            	};

            	dispatch_dev("SvelteRegisterBlock", {
            		block,
            		id: create_fragment$4.name,
            		type: "component",
            		source: "",
            		ctx
            	});

            	return block;
            }

            function instance$4($$self, $$props) {
            	let { $$slots: slots = {}, $$scope } = $$props;
            	validate_slots("Reflection", slots, []);
            	const writable_props = [];

            	Object.keys($$props).forEach(key => {
            		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Reflection> was created with unknown prop '${key}'`);
            	});

            	return [];
            }

            class Reflection extends SvelteComponentDev {
            	constructor(options) {
            		super(options);
            		init(this, options, instance$4, create_fragment$4, not_equal, {});

            		dispatch_dev("SvelteRegisterComponent", {
            			component: this,
            			tagName: "Reflection",
            			options,
            			id: create_fragment$4.name
            		});
            	}
            }

            /* src/components/Hero/Background/SVG/MorningSun.svelte generated by Svelte v3.26.0 */

            const file$5 = "src/components/Hero/Background/SVG/MorningSun.svelte";

            function create_fragment$5(ctx) {
            	let img;
            	let img_src_value;

            	const block = {
            		c: function create() {
            			img = element("img");
            			this.h();
            		},
            		l: function claim(nodes) {
            			img = claim_element(nodes, "IMG", { src: true, alt: true, class: true });
            			this.h();
            		},
            		h: function hydrate() {
            			if (img.src !== (img_src_value = "/images/morning-sun.svg")) attr_dev(img, "src", img_src_value);
            			attr_dev(img, "alt", "A moon");
            			attr_dev(img, "class", "svelte-76ztoc");
            			add_location(img, file$5, 10, 0, 174);
            		},
            		m: function mount(target, anchor) {
            			insert_dev(target, img, anchor);
            		},
            		p: noop,
            		i: noop,
            		o: noop,
            		d: function destroy(detaching) {
            			if (detaching) detach_dev(img);
            		}
            	};

            	dispatch_dev("SvelteRegisterBlock", {
            		block,
            		id: create_fragment$5.name,
            		type: "component",
            		source: "",
            		ctx
            	});

            	return block;
            }

            function instance$5($$self, $$props) {
            	let { $$slots: slots = {}, $$scope } = $$props;
            	validate_slots("MorningSun", slots, []);
            	const writable_props = [];

            	Object.keys($$props).forEach(key => {
            		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MorningSun> was created with unknown prop '${key}'`);
            	});

            	return [];
            }

            class MorningSun extends SvelteComponentDev {
            	constructor(options) {
            		super(options);
            		init(this, options, instance$5, create_fragment$5, not_equal, {});

            		dispatch_dev("SvelteRegisterComponent", {
            			component: this,
            			tagName: "MorningSun",
            			options,
            			id: create_fragment$5.name
            		});
            	}
            }

            /* src/components/Hero/Background/Background.svelte generated by Svelte v3.26.0 */

            const file$6 = "src/components/Hero/Background/Background.svelte";

            function create_fragment$6(ctx) {
            	let div;
            	let morningsun;
            	let t0;
            	let backmountain;
            	let t1;
            	let midmountain;
            	let t2;
            	let frontmountain;
            	let t3;
            	let bears;
            	let t4;
            	let reflection;
            	let current;
            	morningsun = new MorningSun({ $$inline: true });

            	backmountain = new BackMountain({
            			props: { type: "morning" },
            			$$inline: true
            		});

            	midmountain = new MidMountain({
            			props: { type: "morning" },
            			$$inline: true
            		});

            	frontmountain = new FrontMountain({
            			props: { type: "morning" },
            			$$inline: true
            		});

            	bears = new Bears({ $$inline: true });
            	reflection = new Reflection({ $$inline: true });

            	const block = {
            		c: function create() {
            			div = element("div");
            			create_component(morningsun.$$.fragment);
            			t0 = space();
            			create_component(backmountain.$$.fragment);
            			t1 = space();
            			create_component(midmountain.$$.fragment);
            			t2 = space();
            			create_component(frontmountain.$$.fragment);
            			t3 = space();
            			create_component(bears.$$.fragment);
            			t4 = space();
            			create_component(reflection.$$.fragment);
            			this.h();
            		},
            		l: function claim(nodes) {
            			div = claim_element(nodes, "DIV", { class: true });
            			var div_nodes = children(div);
            			claim_component(morningsun.$$.fragment, div_nodes);
            			t0 = claim_space(div_nodes);
            			claim_component(backmountain.$$.fragment, div_nodes);
            			t1 = claim_space(div_nodes);
            			claim_component(midmountain.$$.fragment, div_nodes);
            			t2 = claim_space(div_nodes);
            			claim_component(frontmountain.$$.fragment, div_nodes);
            			t3 = claim_space(div_nodes);
            			claim_component(bears.$$.fragment, div_nodes);
            			t4 = claim_space(div_nodes);
            			claim_component(reflection.$$.fragment, div_nodes);
            			div_nodes.forEach(detach_dev);
            			this.h();
            		},
            		h: function hydrate() {
            			attr_dev(div, "class", "container svelte-spzizf");
            			add_location(div, file$6, 24, 0, 290);
            		},
            		m: function mount(target, anchor) {
            			insert_dev(target, div, anchor);
            			mount_component(morningsun, div, null);
            			append_dev(div, t0);
            			mount_component(backmountain, div, null);
            			append_dev(div, t1);
            			mount_component(midmountain, div, null);
            			append_dev(div, t2);
            			mount_component(frontmountain, div, null);
            			append_dev(div, t3);
            			mount_component(bears, div, null);
            			append_dev(div, t4);
            			mount_component(reflection, div, null);
            			current = true;
            		},
            		p: noop,
            		i: function intro(local) {
            			if (current) return;
            			transition_in(morningsun.$$.fragment, local);
            			transition_in(backmountain.$$.fragment, local);
            			transition_in(midmountain.$$.fragment, local);
            			transition_in(frontmountain.$$.fragment, local);
            			transition_in(bears.$$.fragment, local);
            			transition_in(reflection.$$.fragment, local);
            			current = true;
            		},
            		o: function outro(local) {
            			transition_out(morningsun.$$.fragment, local);
            			transition_out(backmountain.$$.fragment, local);
            			transition_out(midmountain.$$.fragment, local);
            			transition_out(frontmountain.$$.fragment, local);
            			transition_out(bears.$$.fragment, local);
            			transition_out(reflection.$$.fragment, local);
            			current = false;
            		},
            		d: function destroy(detaching) {
            			if (detaching) detach_dev(div);
            			destroy_component(morningsun);
            			destroy_component(backmountain);
            			destroy_component(midmountain);
            			destroy_component(frontmountain);
            			destroy_component(bears);
            			destroy_component(reflection);
            		}
            	};

            	dispatch_dev("SvelteRegisterBlock", {
            		block,
            		id: create_fragment$6.name,
            		type: "component",
            		source: "",
            		ctx
            	});

            	return block;
            }

            function instance$6($$self, $$props, $$invalidate) {
            	let { $$slots: slots = {}, $$scope } = $$props;
            	validate_slots("Background", slots, []);
            	const writable_props = [];

            	Object.keys($$props).forEach(key => {
            		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Background> was created with unknown prop '${key}'`);
            	});

            	$$self.$capture_state = () => ({
            		BackMountain,
            		MidMountain,
            		FrontMountain,
            		Reflection,
            		Bears,
            		MorningSun
            	});

            	return [];
            }

            class Background extends SvelteComponentDev {
            	constructor(options) {
            		super(options);
            		init(this, options, instance$6, create_fragment$6, not_equal, {});

            		dispatch_dev("SvelteRegisterComponent", {
            			component: this,
            			tagName: "Background",
            			options,
            			id: create_fragment$6.name
            		});
            	}
            }

            /* src/components/Hero/Navigation.svelte generated by Svelte v3.26.0 */

            const file$7 = "src/components/Hero/Navigation.svelte";

            function get_each_context(ctx, list, i) {
            	const child_ctx = ctx.slice();
            	child_ctx[8] = list[i].name;
            	child_ctx[9] = list[i].url;
            	return child_ctx;
            }

            function get_each_context_1(ctx, list, i) {
            	const child_ctx = ctx.slice();
            	child_ctx[9] = list[i].url;
            	child_ctx[8] = list[i].name;
            	return child_ctx;
            }

            // (119:4) {#each menu as { url, name }}
            function create_each_block_1(ctx) {
            	let a;
            	let t_value = /*name*/ ctx[8] + "";
            	let t;
            	let a_href_value;

            	const block = {
            		c: function create() {
            			a = element("a");
            			t = text(t_value);
            			this.h();
            		},
            		l: function claim(nodes) {
            			a = claim_element(nodes, "A", { class: true, href: true });
            			var a_nodes = children(a);
            			t = claim_text(a_nodes, t_value);
            			a_nodes.forEach(detach_dev);
            			this.h();
            		},
            		h: function hydrate() {
            			attr_dev(a, "class", "big-nav svelte-fpzbx8");
            			attr_dev(a, "href", a_href_value = /*url*/ ctx[9]);
            			toggle_class(a, "scrolled", /*scrolled*/ ctx[3]);
            			add_location(a, file$7, 119, 6, 1877);
            		},
            		m: function mount(target, anchor) {
            			insert_dev(target, a, anchor);
            			append_dev(a, t);
            		},
            		p: function update(ctx, dirty) {
            			if (dirty & /*menu*/ 1 && t_value !== (t_value = /*name*/ ctx[8] + "")) set_data_dev(t, t_value);

            			if (dirty & /*menu*/ 1 && a_href_value !== (a_href_value = /*url*/ ctx[9])) {
            				attr_dev(a, "href", a_href_value);
            			}

            			if (dirty & /*scrolled*/ 8) {
            				toggle_class(a, "scrolled", /*scrolled*/ ctx[3]);
            			}
            		},
            		d: function destroy(detaching) {
            			if (detaching) detach_dev(a);
            		}
            	};

            	dispatch_dev("SvelteRegisterBlock", {
            		block,
            		id: create_each_block_1.name,
            		type: "each",
            		source: "(119:4) {#each menu as { url, name }}",
            		ctx
            	});

            	return block;
            }

            // (148:0) {#if menuOpen}
            function create_if_block(ctx) {
            	let div;
            	let ul;
            	let t0;
            	let li0;
            	let a0;
            	let t1;
            	let t2;
            	let li1;
            	let a1;
            	let t3;
            	let t4;
            	let button;
            	let img;
            	let img_src_value;
            	let mounted;
            	let dispose;
            	let each_value = /*menu*/ ctx[0];
            	validate_each_argument(each_value);
            	let each_blocks = [];

            	for (let i = 0; i < each_value.length; i += 1) {
            		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
            	}

            	const block = {
            		c: function create() {
            			div = element("div");
            			ul = element("ul");

            			for (let i = 0; i < each_blocks.length; i += 1) {
            				each_blocks[i].c();
            			}

            			t0 = space();
            			li0 = element("li");
            			a0 = element("a");
            			t1 = text("Sign up");
            			t2 = space();
            			li1 = element("li");
            			a1 = element("a");
            			t3 = text("Twitter");
            			t4 = space();
            			button = element("button");
            			img = element("img");
            			this.h();
            		},
            		l: function claim(nodes) {
            			div = claim_element(nodes, "DIV", { class: true });
            			var div_nodes = children(div);
            			ul = claim_element(div_nodes, "UL", { class: true });
            			var ul_nodes = children(ul);

            			for (let i = 0; i < each_blocks.length; i += 1) {
            				each_blocks[i].l(ul_nodes);
            			}

            			t0 = claim_space(ul_nodes);
            			li0 = claim_element(ul_nodes, "LI", { class: true });
            			var li0_nodes = children(li0);

            			a0 = claim_element(li0_nodes, "A", {
            				class: true,
            				href: true,
            				rel: true,
            				target: true
            			});

            			var a0_nodes = children(a0);
            			t1 = claim_text(a0_nodes, "Sign up");
            			a0_nodes.forEach(detach_dev);
            			li0_nodes.forEach(detach_dev);
            			t2 = claim_space(ul_nodes);
            			li1 = claim_element(ul_nodes, "LI", { class: true });
            			var li1_nodes = children(li1);

            			a1 = claim_element(li1_nodes, "A", {
            				class: true,
            				target: true,
            				rel: true,
            				href: true
            			});

            			var a1_nodes = children(a1);
            			t3 = claim_text(a1_nodes, "Twitter");
            			a1_nodes.forEach(detach_dev);
            			li1_nodes.forEach(detach_dev);
            			ul_nodes.forEach(detach_dev);
            			t4 = claim_space(div_nodes);
            			button = claim_element(div_nodes, "BUTTON", { class: true });
            			var button_nodes = children(button);
            			img = claim_element(button_nodes, "IMG", { class: true, src: true, alt: true });
            			button_nodes.forEach(detach_dev);
            			div_nodes.forEach(detach_dev);
            			this.h();
            		},
            		h: function hydrate() {
            			attr_dev(a0, "class", "small-nav svelte-fpzbx8");
            			attr_dev(a0, "href", "https://forms.gle/6PBKXng9jfrvxjhX8");
            			attr_dev(a0, "rel", "noreferrer");
            			attr_dev(a0, "target", "_blank");
            			add_location(a0, file$7, 159, 8, 2768);
            			attr_dev(li0, "class", "svelte-fpzbx8");
            			add_location(li0, file$7, 158, 6, 2755);
            			attr_dev(a1, "class", "small-nav svelte-fpzbx8");
            			attr_dev(a1, "target", "_blank");
            			attr_dev(a1, "rel", "noreferrer");
            			attr_dev(a1, "href", "https://twitter.com/sveltesociety");
            			add_location(a1, file$7, 168, 8, 2968);
            			attr_dev(li1, "class", "svelte-fpzbx8");
            			add_location(li1, file$7, 167, 6, 2955);
            			attr_dev(ul, "class", "svelte-fpzbx8");
            			add_location(ul, file$7, 149, 4, 2539);
            			attr_dev(img, "class", "close svelte-fpzbx8");
            			if (img.src !== (img_src_value = "images/close.svg")) attr_dev(img, "src", img_src_value);
            			attr_dev(img, "alt", "");
            			add_location(img, file$7, 176, 6, 3192);
            			attr_dev(button, "class", "svelte-fpzbx8");
            			add_location(button, file$7, 175, 4, 3141);
            			attr_dev(div, "class", "container svelte-fpzbx8");
            			add_location(div, file$7, 148, 2, 2511);
            		},
            		m: function mount(target, anchor) {
            			insert_dev(target, div, anchor);
            			append_dev(div, ul);

            			for (let i = 0; i < each_blocks.length; i += 1) {
            				each_blocks[i].m(ul, null);
            			}

            			append_dev(ul, t0);
            			append_dev(ul, li0);
            			append_dev(li0, a0);
            			append_dev(a0, t1);
            			append_dev(ul, t2);
            			append_dev(ul, li1);
            			append_dev(li1, a1);
            			append_dev(a1, t3);
            			append_dev(div, t4);
            			append_dev(div, button);
            			append_dev(button, img);

            			if (!mounted) {
            				dispose = listen_dev(button, "click", /*click_handler_2*/ ctx[7], false, false, false);
            				mounted = true;
            			}
            		},
            		p: function update(ctx, dirty) {
            			if (dirty & /*menu, menuOpen*/ 5) {
            				each_value = /*menu*/ ctx[0];
            				validate_each_argument(each_value);
            				let i;

            				for (i = 0; i < each_value.length; i += 1) {
            					const child_ctx = get_each_context(ctx, each_value, i);

            					if (each_blocks[i]) {
            						each_blocks[i].p(child_ctx, dirty);
            					} else {
            						each_blocks[i] = create_each_block(child_ctx);
            						each_blocks[i].c();
            						each_blocks[i].m(ul, t0);
            					}
            				}

            				for (; i < each_blocks.length; i += 1) {
            					each_blocks[i].d(1);
            				}

            				each_blocks.length = each_value.length;
            			}
            		},
            		d: function destroy(detaching) {
            			if (detaching) detach_dev(div);
            			destroy_each(each_blocks, detaching);
            			mounted = false;
            			dispose();
            		}
            	};

            	dispatch_dev("SvelteRegisterBlock", {
            		block,
            		id: create_if_block.name,
            		type: "if",
            		source: "(148:0) {#if menuOpen}",
            		ctx
            	});

            	return block;
            }

            // (151:6) {#each menu as { name, url }}
            function create_each_block(ctx) {
            	let li;
            	let a;
            	let t_value = /*name*/ ctx[8] + "";
            	let t;
            	let a_href_value;
            	let mounted;
            	let dispose;

            	const block = {
            		c: function create() {
            			li = element("li");
            			a = element("a");
            			t = text(t_value);
            			this.h();
            		},
            		l: function claim(nodes) {
            			li = claim_element(nodes, "LI", { class: true });
            			var li_nodes = children(li);
            			a = claim_element(li_nodes, "A", { class: true, href: true });
            			var a_nodes = children(a);
            			t = claim_text(a_nodes, t_value);
            			a_nodes.forEach(detach_dev);
            			li_nodes.forEach(detach_dev);
            			this.h();
            		},
            		h: function hydrate() {
            			attr_dev(a, "class", "small-nav svelte-fpzbx8");
            			attr_dev(a, "href", a_href_value = "/" + /*url*/ ctx[9]);
            			add_location(a, file$7, 152, 10, 2603);
            			attr_dev(li, "class", "svelte-fpzbx8");
            			add_location(li, file$7, 151, 8, 2588);
            		},
            		m: function mount(target, anchor) {
            			insert_dev(target, li, anchor);
            			append_dev(li, a);
            			append_dev(a, t);

            			if (!mounted) {
            				dispose = listen_dev(a, "click", /*click_handler_1*/ ctx[6], false, false, false);
            				mounted = true;
            			}
            		},
            		p: function update(ctx, dirty) {
            			if (dirty & /*menu*/ 1 && t_value !== (t_value = /*name*/ ctx[8] + "")) set_data_dev(t, t_value);

            			if (dirty & /*menu*/ 1 && a_href_value !== (a_href_value = "/" + /*url*/ ctx[9])) {
            				attr_dev(a, "href", a_href_value);
            			}
            		},
            		d: function destroy(detaching) {
            			if (detaching) detach_dev(li);
            			mounted = false;
            			dispose();
            		}
            	};

            	dispatch_dev("SvelteRegisterBlock", {
            		block,
            		id: create_each_block.name,
            		type: "each",
            		source: "(151:6) {#each menu as { name, url }}",
            		ctx
            	});

            	return block;
            }

            function create_fragment$7(ctx) {
            	let scrolling = false;

            	let clear_scrolling = () => {
            		scrolling = false;
            	};

            	let scrolling_timeout;
            	let div0;
            	let nav;
            	let t0;
            	let a0;
            	let t1;
            	let t2;
            	let a1;
            	let span;
            	let img0;
            	let img0_src_value;
            	let t3;
            	let t4;
            	let div1;
            	let img1;
            	let img1_src_value;
            	let t5;
            	let if_block_anchor;
            	let mounted;
            	let dispose;
            	add_render_callback(/*onwindowscroll*/ ctx[4]);
            	let each_value_1 = /*menu*/ ctx[0];
            	validate_each_argument(each_value_1);
            	let each_blocks = [];

            	for (let i = 0; i < each_value_1.length; i += 1) {
            		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
            	}

            	let if_block = /*menuOpen*/ ctx[2] && create_if_block(ctx);

            	const block = {
            		c: function create() {
            			div0 = element("div");
            			nav = element("nav");

            			for (let i = 0; i < each_blocks.length; i += 1) {
            				each_blocks[i].c();
            			}

            			t0 = space();
            			a0 = element("a");
            			t1 = text("Sign Up");
            			t2 = space();
            			a1 = element("a");
            			span = element("span");
            			img0 = element("img");
            			t3 = text(" Twitter");
            			t4 = space();
            			div1 = element("div");
            			img1 = element("img");
            			t5 = space();
            			if (if_block) if_block.c();
            			if_block_anchor = empty();
            			this.h();
            		},
            		l: function claim(nodes) {
            			div0 = claim_element(nodes, "DIV", { class: true });
            			var div0_nodes = children(div0);
            			nav = claim_element(div0_nodes, "NAV", {});
            			var nav_nodes = children(nav);

            			for (let i = 0; i < each_blocks.length; i += 1) {
            				each_blocks[i].l(nav_nodes);
            			}

            			t0 = claim_space(nav_nodes);

            			a0 = claim_element(nav_nodes, "A", {
            				class: true,
            				rel: true,
            				href: true,
            				target: true
            			});

            			var a0_nodes = children(a0);
            			t1 = claim_text(a0_nodes, "Sign Up");
            			a0_nodes.forEach(detach_dev);
            			t2 = claim_space(nav_nodes);

            			a1 = claim_element(nav_nodes, "A", {
            				class: true,
            				rel: true,
            				target: true,
            				href: true
            			});

            			var a1_nodes = children(a1);
            			span = claim_element(a1_nodes, "SPAN", { class: true });
            			var span_nodes = children(span);
            			img0 = claim_element(span_nodes, "IMG", { class: true, src: true, alt: true });
            			t3 = claim_text(span_nodes, " Twitter");
            			span_nodes.forEach(detach_dev);
            			a1_nodes.forEach(detach_dev);
            			nav_nodes.forEach(detach_dev);
            			div0_nodes.forEach(detach_dev);
            			t4 = claim_space(nodes);
            			div1 = claim_element(nodes, "DIV", { class: true });
            			var div1_nodes = children(div1);
            			img1 = claim_element(div1_nodes, "IMG", { src: true, alt: true });
            			div1_nodes.forEach(detach_dev);
            			t5 = claim_space(nodes);
            			if (if_block) if_block.l(nodes);
            			if_block_anchor = empty();
            			this.h();
            		},
            		h: function hydrate() {
            			attr_dev(a0, "class", "big-nav svelte-fpzbx8");
            			attr_dev(a0, "rel", "noreferrer");
            			attr_dev(a0, "href", "https://forms.gle/6PBKXng9jfrvxjhX8");
            			attr_dev(a0, "target", "_blank");
            			toggle_class(a0, "scrolled", /*scrolled*/ ctx[3]);
            			add_location(a0, file$7, 122, 4, 1952);
            			attr_dev(img0, "class", "twitter svelte-fpzbx8");
            			if (img0.src !== (img0_src_value = "/images/twitter.svg")) attr_dev(img0, "src", img0_src_value);
            			attr_dev(img0, "alt", "");
            			add_location(img0, file$7, 138, 8, 2281);
            			attr_dev(span, "class", "svelte-fpzbx8");
            			add_location(span, file$7, 137, 6, 2266);
            			attr_dev(a1, "class", "big-nav svelte-fpzbx8");
            			attr_dev(a1, "rel", "noreferrer");
            			attr_dev(a1, "target", "_blank");
            			attr_dev(a1, "href", "https://twitter.com/sveltesociety");
            			toggle_class(a1, "scrolled", /*scrolled*/ ctx[3]);
            			add_location(a1, file$7, 131, 4, 2121);
            			add_location(nav, file$7, 117, 2, 1831);
            			attr_dev(div0, "class", "navcontainer svelte-fpzbx8");
            			toggle_class(div0, "scrolled", /*scrolled*/ ctx[3]);
            			add_location(div0, file$7, 116, 0, 1787);
            			if (img1.src !== (img1_src_value = "/images/burger.svg")) attr_dev(img1, "src", img1_src_value);
            			attr_dev(img1, "alt", "");
            			add_location(img1, file$7, 144, 2, 2446);
            			attr_dev(div1, "class", "hamburger svelte-fpzbx8");
            			add_location(div1, file$7, 143, 0, 2385);
            		},
            		m: function mount(target, anchor) {
            			insert_dev(target, div0, anchor);
            			append_dev(div0, nav);

            			for (let i = 0; i < each_blocks.length; i += 1) {
            				each_blocks[i].m(nav, null);
            			}

            			append_dev(nav, t0);
            			append_dev(nav, a0);
            			append_dev(a0, t1);
            			append_dev(nav, t2);
            			append_dev(nav, a1);
            			append_dev(a1, span);
            			append_dev(span, img0);
            			append_dev(span, t3);
            			insert_dev(target, t4, anchor);
            			insert_dev(target, div1, anchor);
            			append_dev(div1, img1);
            			insert_dev(target, t5, anchor);
            			if (if_block) if_block.m(target, anchor);
            			insert_dev(target, if_block_anchor, anchor);

            			if (!mounted) {
            				dispose = [
            					listen_dev(window, "scroll", () => {
            						scrolling = true;
            						clearTimeout(scrolling_timeout);
            						scrolling_timeout = setTimeout(clear_scrolling, 100);
            						/*onwindowscroll*/ ctx[4]();
            					}),
            					listen_dev(div1, "click", /*click_handler*/ ctx[5], false, false, false)
            				];

            				mounted = true;
            			}
            		},
            		p: function update(ctx, [dirty]) {
            			if (dirty & /*y*/ 2 && !scrolling) {
            				scrolling = true;
            				clearTimeout(scrolling_timeout);
            				scrollTo(window.pageXOffset, /*y*/ ctx[1]);
            				scrolling_timeout = setTimeout(clear_scrolling, 100);
            			}

            			if (dirty & /*menu, scrolled*/ 9) {
            				each_value_1 = /*menu*/ ctx[0];
            				validate_each_argument(each_value_1);
            				let i;

            				for (i = 0; i < each_value_1.length; i += 1) {
            					const child_ctx = get_each_context_1(ctx, each_value_1, i);

            					if (each_blocks[i]) {
            						each_blocks[i].p(child_ctx, dirty);
            					} else {
            						each_blocks[i] = create_each_block_1(child_ctx);
            						each_blocks[i].c();
            						each_blocks[i].m(nav, t0);
            					}
            				}

            				for (; i < each_blocks.length; i += 1) {
            					each_blocks[i].d(1);
            				}

            				each_blocks.length = each_value_1.length;
            			}

            			if (dirty & /*scrolled*/ 8) {
            				toggle_class(a0, "scrolled", /*scrolled*/ ctx[3]);
            			}

            			if (dirty & /*scrolled*/ 8) {
            				toggle_class(a1, "scrolled", /*scrolled*/ ctx[3]);
            			}

            			if (dirty & /*scrolled*/ 8) {
            				toggle_class(div0, "scrolled", /*scrolled*/ ctx[3]);
            			}

            			if (/*menuOpen*/ ctx[2]) {
            				if (if_block) {
            					if_block.p(ctx, dirty);
            				} else {
            					if_block = create_if_block(ctx);
            					if_block.c();
            					if_block.m(if_block_anchor.parentNode, if_block_anchor);
            				}
            			} else if (if_block) {
            				if_block.d(1);
            				if_block = null;
            			}
            		},
            		i: noop,
            		o: noop,
            		d: function destroy(detaching) {
            			if (detaching) detach_dev(div0);
            			destroy_each(each_blocks, detaching);
            			if (detaching) detach_dev(t4);
            			if (detaching) detach_dev(div1);
            			if (detaching) detach_dev(t5);
            			if (if_block) if_block.d(detaching);
            			if (detaching) detach_dev(if_block_anchor);
            			mounted = false;
            			run_all(dispose);
            		}
            	};

            	dispatch_dev("SvelteRegisterBlock", {
            		block,
            		id: create_fragment$7.name,
            		type: "component",
            		source: "",
            		ctx
            	});

            	return block;
            }

            function instance$7($$self, $$props, $$invalidate) {
            	let { $$slots: slots = {}, $$scope } = $$props;
            	validate_slots("Navigation", slots, []);
            	let y;
            	let { menu } = $$props;
            	let menuOpen = false;
            	const writable_props = ["menu"];

            	Object.keys($$props).forEach(key => {
            		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Navigation> was created with unknown prop '${key}'`);
            	});

            	function onwindowscroll() {
            		$$invalidate(1, y = window.pageYOffset);
            	}

            	const click_handler = () => $$invalidate(2, menuOpen = true);
            	const click_handler_1 = () => $$invalidate(2, menuOpen = false);
            	const click_handler_2 = () => $$invalidate(2, menuOpen = false);

            	$$self.$$set = $$props => {
            		if ("menu" in $$props) $$invalidate(0, menu = $$props.menu);
            	};

            	$$self.$capture_state = () => ({ y, menu, menuOpen, scrolled });

            	$$self.$inject_state = $$props => {
            		if ("y" in $$props) $$invalidate(1, y = $$props.y);
            		if ("menu" in $$props) $$invalidate(0, menu = $$props.menu);
            		if ("menuOpen" in $$props) $$invalidate(2, menuOpen = $$props.menuOpen);
            		if ("scrolled" in $$props) $$invalidate(3, scrolled = $$props.scrolled);
            	};

            	let scrolled;

            	if ($$props && "$$inject" in $$props) {
            		$$self.$inject_state($$props.$$inject);
            	}

            	$$self.$$.update = () => {
            		if ($$self.$$.dirty & /*y*/ 2) {
            			 $$invalidate(3, scrolled = y > 100);
            		}
            	};

            	return [
            		menu,
            		y,
            		menuOpen,
            		scrolled,
            		onwindowscroll,
            		click_handler,
            		click_handler_1,
            		click_handler_2
            	];
            }

            class Navigation extends SvelteComponentDev {
            	constructor(options) {
            		super(options);
            		init(this, options, instance$7, create_fragment$7, not_equal, { menu: 0 });

            		dispatch_dev("SvelteRegisterComponent", {
            			component: this,
            			tagName: "Navigation",
            			options,
            			id: create_fragment$7.name
            		});

            		const { ctx } = this.$$;
            		const props = options.props || {};

            		if (/*menu*/ ctx[0] === undefined && !("menu" in props)) {
            			console.warn("<Navigation> was created without expected prop 'menu'");
            		}
            	}

            	get menu() {
            		throw new Error("<Navigation>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
            	}

            	set menu(value) {
            		throw new Error("<Navigation>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
            	}
            }

            /* src/components/Hero/Info.svelte generated by Svelte v3.26.0 */

            const file$8 = "src/components/Hero/Info.svelte";

            function create_fragment$8(ctx) {
            	let div1;
            	let time;
            	let span0;
            	let t0;
            	let t1;
            	let span1;
            	let t2;
            	let t3;
            	let div0;
            	let t4;

            	const block = {
            		c: function create() {
            			div1 = element("div");
            			time = element("time");
            			span0 = element("span");
            			t0 = text("OCT 18");
            			t1 = space();
            			span1 = element("span");
            			t2 = text("2020");
            			t3 = space();
            			div0 = element("div");
            			t4 = text("THE 2ND VIRTUAL CONFERENCE ABOUT SVELTE");
            			this.h();
            		},
            		l: function claim(nodes) {
            			div1 = claim_element(nodes, "DIV", { class: true });
            			var div1_nodes = children(div1);
            			time = claim_element(div1_nodes, "TIME", { class: true, datetime: true });
            			var time_nodes = children(time);
            			span0 = claim_element(time_nodes, "SPAN", { class: true });
            			var span0_nodes = children(span0);
            			t0 = claim_text(span0_nodes, "OCT 18");
            			span0_nodes.forEach(detach_dev);
            			t1 = claim_space(time_nodes);
            			span1 = claim_element(time_nodes, "SPAN", { class: true });
            			var span1_nodes = children(span1);
            			t2 = claim_text(span1_nodes, "2020");
            			span1_nodes.forEach(detach_dev);
            			time_nodes.forEach(detach_dev);
            			t3 = claim_space(div1_nodes);
            			div0 = claim_element(div1_nodes, "DIV", { class: true });
            			var div0_nodes = children(div0);
            			t4 = claim_text(div0_nodes, "THE 2ND VIRTUAL CONFERENCE ABOUT SVELTE");
            			div0_nodes.forEach(detach_dev);
            			div1_nodes.forEach(detach_dev);
            			this.h();
            		},
            		h: function hydrate() {
            			attr_dev(span0, "class", "svelte-1gnpq5v");
            			add_location(span0, file$8, 42, 4, 1050);
            			attr_dev(span1, "class", "svelte-1gnpq5v");
            			add_location(span1, file$8, 43, 4, 1074);
            			attr_dev(time, "class", "display svelte-1gnpq5v");
            			attr_dev(time, "datetime", "2020-10-18");
            			add_location(time, file$8, 41, 2, 1001);
            			attr_dev(div0, "class", "sub display svelte-1gnpq5v");
            			add_location(div0, file$8, 45, 2, 1104);
            			attr_dev(div1, "class", "info svelte-1gnpq5v");
            			add_location(div1, file$8, 40, 0, 980);
            		},
            		m: function mount(target, anchor) {
            			insert_dev(target, div1, anchor);
            			append_dev(div1, time);
            			append_dev(time, span0);
            			append_dev(span0, t0);
            			append_dev(time, t1);
            			append_dev(time, span1);
            			append_dev(span1, t2);
            			append_dev(div1, t3);
            			append_dev(div1, div0);
            			append_dev(div0, t4);
            		},
            		p: noop,
            		i: noop,
            		o: noop,
            		d: function destroy(detaching) {
            			if (detaching) detach_dev(div1);
            		}
            	};

            	dispatch_dev("SvelteRegisterBlock", {
            		block,
            		id: create_fragment$8.name,
            		type: "component",
            		source: "",
            		ctx
            	});

            	return block;
            }

            function instance$8($$self, $$props) {
            	let { $$slots: slots = {}, $$scope } = $$props;
            	validate_slots("Info", slots, []);
            	const writable_props = [];

            	Object.keys($$props).forEach(key => {
            		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Info> was created with unknown prop '${key}'`);
            	});

            	return [];
            }

            class Info extends SvelteComponentDev {
            	constructor(options) {
            		super(options);
            		init(this, options, instance$8, create_fragment$8, not_equal, {});

            		dispatch_dev("SvelteRegisterComponent", {
            			component: this,
            			tagName: "Info",
            			options,
            			id: create_fragment$8.name
            		});
            	}
            }

            /* src/components/Hero/Title.svelte generated by Svelte v3.26.0 */

            const file$9 = "src/components/Hero/Title.svelte";

            function create_fragment$9(ctx) {
            	let h1;
            	let span0;
            	let t0;
            	let t1;
            	let span1;
            	let t2;

            	const block = {
            		c: function create() {
            			h1 = element("h1");
            			span0 = element("span");
            			t0 = text("SVELTE");
            			t1 = space();
            			span1 = element("span");
            			t2 = text("SUMMIT");
            			this.h();
            		},
            		l: function claim(nodes) {
            			h1 = claim_element(nodes, "H1", { class: true });
            			var h1_nodes = children(h1);
            			span0 = claim_element(h1_nodes, "SPAN", { class: true });
            			var span0_nodes = children(span0);
            			t0 = claim_text(span0_nodes, "SVELTE");
            			span0_nodes.forEach(detach_dev);
            			t1 = claim_space(h1_nodes);
            			span1 = claim_element(h1_nodes, "SPAN", { class: true });
            			var span1_nodes = children(span1);
            			t2 = claim_text(span1_nodes, "SUMMIT");
            			span1_nodes.forEach(detach_dev);
            			h1_nodes.forEach(detach_dev);
            			this.h();
            		},
            		h: function hydrate() {
            			attr_dev(span0, "class", "leading svelte-16fjkkh");
            			add_location(span0, file$9, 21, 2, 459);
            			attr_dev(span1, "class", "lagging svelte-16fjkkh");
            			add_location(span1, file$9, 22, 2, 497);
            			attr_dev(h1, "class", "display svelte-16fjkkh");
            			add_location(h1, file$9, 20, 0, 436);
            		},
            		m: function mount(target, anchor) {
            			insert_dev(target, h1, anchor);
            			append_dev(h1, span0);
            			append_dev(span0, t0);
            			append_dev(h1, t1);
            			append_dev(h1, span1);
            			append_dev(span1, t2);
            		},
            		p: noop,
            		i: noop,
            		o: noop,
            		d: function destroy(detaching) {
            			if (detaching) detach_dev(h1);
            		}
            	};

            	dispatch_dev("SvelteRegisterBlock", {
            		block,
            		id: create_fragment$9.name,
            		type: "component",
            		source: "",
            		ctx
            	});

            	return block;
            }

            function instance$9($$self, $$props) {
            	let { $$slots: slots = {}, $$scope } = $$props;
            	validate_slots("Title", slots, []);
            	const writable_props = [];

            	Object.keys($$props).forEach(key => {
            		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Title> was created with unknown prop '${key}'`);
            	});

            	return [];
            }

            class Title extends SvelteComponentDev {
            	constructor(options) {
            		super(options);
            		init(this, options, instance$9, create_fragment$9, not_equal, {});

            		dispatch_dev("SvelteRegisterComponent", {
            			component: this,
            			tagName: "Title",
            			options,
            			id: create_fragment$9.name
            		});
            	}
            }

            /* src/components/Hero/Hero.svelte generated by Svelte v3.26.0 */
            const file$a = "src/components/Hero/Hero.svelte";

            function create_fragment$a(ctx) {
            	let div2;
            	let navigation;
            	let t0;
            	let div0;
            	let a;
            	let img;
            	let img_src_value;
            	let t1;
            	let span;
            	let t2;
            	let t3;
            	let div1;
            	let title;
            	let t4;
            	let info;
            	let t5;
            	let background;
            	let current;

            	navigation = new Navigation({
            			props: {
            				"hydrate-client": {
            					preload: true,
            					loading: "eager",
            					menu: /*menu*/ ctx[0]
            				}
            			},
            			$$inline: true
            		});

            	title = new Title({ $$inline: true });
            	info = new Info({ $$inline: true });
            	background = new Background({ $$inline: true });

            	const block = {
            		c: function create() {
            			div2 = element("div");
            			create_component(navigation.$$.fragment);
            			t0 = space();
            			div0 = element("div");
            			a = element("a");
            			img = element("img");
            			t1 = space();
            			span = element("span");
            			t2 = text("presents");
            			t3 = space();
            			div1 = element("div");
            			create_component(title.$$.fragment);
            			t4 = space();
            			create_component(info.$$.fragment);
            			t5 = space();
            			create_component(background.$$.fragment);
            			this.h();
            		},
            		l: function claim(nodes) {
            			div2 = claim_element(nodes, "DIV", { class: true, id: true });
            			var div2_nodes = children(div2);
            			claim_component(navigation.$$.fragment, div2_nodes);
            			t0 = claim_space(div2_nodes);
            			div0 = claim_element(div2_nodes, "DIV", { class: true });
            			var div0_nodes = children(div0);
            			a = claim_element(div0_nodes, "A", { href: true });
            			var a_nodes = children(a);
            			img = claim_element(a_nodes, "IMG", { src: true, alt: true, class: true });
            			a_nodes.forEach(detach_dev);
            			t1 = claim_space(div0_nodes);
            			span = claim_element(div0_nodes, "SPAN", { class: true });
            			var span_nodes = children(span);
            			t2 = claim_text(span_nodes, "presents");
            			span_nodes.forEach(detach_dev);
            			div0_nodes.forEach(detach_dev);
            			t3 = claim_space(div2_nodes);
            			div1 = claim_element(div2_nodes, "DIV", { class: true });
            			var div1_nodes = children(div1);
            			claim_component(title.$$.fragment, div1_nodes);
            			t4 = claim_space(div1_nodes);
            			claim_component(info.$$.fragment, div1_nodes);
            			div1_nodes.forEach(detach_dev);
            			t5 = claim_space(div2_nodes);
            			claim_component(background.$$.fragment, div2_nodes);
            			div2_nodes.forEach(detach_dev);
            			this.h();
            		},
            		h: function hydrate() {
            			if (img.src !== (img_src_value = "/images/svelte-society-logo.svg")) attr_dev(img, "src", img_src_value);
            			attr_dev(img, "alt", "Svelte Society");
            			attr_dev(img, "class", "svelte-1a5c3ok");
            			add_location(img, file$a, 89, 41, 1843);
            			attr_dev(a, "href", "https://sveltesociety.dev/");
            			add_location(a, file$a, 89, 4, 1806);
            			attr_dev(span, "class", "present svelte-1a5c3ok");
            			add_location(span, file$a, 92, 4, 1934);
            			attr_dev(div0, "class", "logo svelte-1a5c3ok");
            			add_location(div0, file$a, 88, 2, 1783);
            			attr_dev(div1, "class", "text svelte-1a5c3ok");
            			add_location(div1, file$a, 94, 2, 1983);
            			attr_dev(div2, "class", "container svelte-1a5c3ok");
            			attr_dev(div2, "id", "intro");
            			add_location(div2, file$a, 86, 0, 1670);
            		},
            		m: function mount(target, anchor) {
            			insert_dev(target, div2, anchor);
            			mount_component(navigation, div2, null);
            			append_dev(div2, t0);
            			append_dev(div2, div0);
            			append_dev(div0, a);
            			append_dev(a, img);
            			append_dev(div0, t1);
            			append_dev(div0, span);
            			append_dev(span, t2);
            			append_dev(div2, t3);
            			append_dev(div2, div1);
            			mount_component(title, div1, null);
            			append_dev(div1, t4);
            			mount_component(info, div1, null);
            			append_dev(div2, t5);
            			mount_component(background, div2, null);
            			current = true;
            		},
            		p: noop,
            		i: function intro(local) {
            			if (current) return;
            			transition_in(navigation.$$.fragment, local);
            			transition_in(title.$$.fragment, local);
            			transition_in(info.$$.fragment, local);
            			transition_in(background.$$.fragment, local);
            			current = true;
            		},
            		o: function outro(local) {
            			transition_out(navigation.$$.fragment, local);
            			transition_out(title.$$.fragment, local);
            			transition_out(info.$$.fragment, local);
            			transition_out(background.$$.fragment, local);
            			current = false;
            		},
            		d: function destroy(detaching) {
            			if (detaching) detach_dev(div2);
            			destroy_component(navigation);
            			destroy_component(title);
            			destroy_component(info);
            			destroy_component(background);
            		}
            	};

            	dispatch_dev("SvelteRegisterBlock", {
            		block,
            		id: create_fragment$a.name,
            		type: "component",
            		source: "",
            		ctx
            	});

            	return block;
            }

            function instance$a($$self, $$props, $$invalidate) {
            	let { $$slots: slots = {}, $$scope } = $$props;
            	validate_slots("Hero", slots, []);

            	const menu = [
            		{ name: "Intro", url: "#intro" },
            		{ name: "Sponsors", url: "#sponsors" },
            		{ name: "Speakers", url: "#speakers" },
            		{ name: "FAQ", url: "#faq" }
            	];

            	const writable_props = [];

            	Object.keys($$props).forEach(key => {
            		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Hero> was created with unknown prop '${key}'`);
            	});

            	$$self.$capture_state = () => ({
            		Background,
            		Navigation,
            		Info,
            		Title,
            		menu
            	});

            	return [menu];
            }

            class Hero extends SvelteComponentDev {
            	constructor(options) {
            		super(options);
            		init(this, options, instance$a, create_fragment$a, not_equal, {});

            		dispatch_dev("SvelteRegisterComponent", {
            			component: this,
            			tagName: "Hero",
            			options,
            			id: create_fragment$a.name
            		});
            	}
            } exports('default', Hero);

        }
    };
});
//# sourceMappingURL=entryHero.js.map
