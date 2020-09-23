System.register([], function (exports) {
    'use strict';
    return {
        execute: function () {

            function noop() { }
            function assign(tar, src) {
                // @ts-ignore
                for (const k in src)
                    tar[k] = src[k];
                return tar;
            }
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
            function create_slot(definition, ctx, $$scope, fn) {
                if (definition) {
                    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
                    return definition[0](slot_ctx);
                }
            }
            function get_slot_context(definition, ctx, $$scope, fn) {
                return definition[1] && fn
                    ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
                    : $$scope.ctx;
            }
            function get_slot_changes(definition, $$scope, dirty, fn) {
                if (definition[2] && fn) {
                    const lets = definition[2](fn(dirty));
                    if ($$scope.dirty === undefined) {
                        return lets;
                    }
                    if (typeof lets === 'object') {
                        const merged = [];
                        const len = Math.max($$scope.dirty.length, lets.length);
                        for (let i = 0; i < len; i += 1) {
                            merged[i] = $$scope.dirty[i] | lets[i];
                        }
                        return merged;
                    }
                    return $$scope.dirty | lets;
                }
                return $$scope.dirty;
            }
            function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
                const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
                if (slot_changes) {
                    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
                    slot.p(slot_context, slot_changes);
                }
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
            function set_data_dev(text, data) {
                data = '' + data;
                if (text.wholeText === data)
                    return;
                dispatch_dev("SvelteDOMSetData", { node: text, data });
                text.data = data;
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

            /* src/components/Question.svelte generated by Svelte v3.26.0 */

            const file = "src/components/Question.svelte";

            function create_fragment(ctx) {
            	let div;
            	let h3;
            	let t0;
            	let t1;
            	let p;
            	let current;
            	const default_slot_template = /*#slots*/ ctx[2].default;
            	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

            	const block = {
            		c: function create() {
            			div = element("div");
            			h3 = element("h3");
            			t0 = text(/*title*/ ctx[0]);
            			t1 = space();
            			p = element("p");
            			if (default_slot) default_slot.c();
            			this.h();
            		},
            		l: function claim(nodes) {
            			div = claim_element(nodes, "DIV", { class: true });
            			var div_nodes = children(div);
            			h3 = claim_element(div_nodes, "H3", {});
            			var h3_nodes = children(h3);
            			t0 = claim_text(h3_nodes, /*title*/ ctx[0]);
            			h3_nodes.forEach(detach_dev);
            			t1 = claim_space(div_nodes);
            			p = claim_element(div_nodes, "P", { class: true });
            			var p_nodes = children(p);
            			if (default_slot) default_slot.l(p_nodes);
            			p_nodes.forEach(detach_dev);
            			div_nodes.forEach(detach_dev);
            			this.h();
            		},
            		h: function hydrate() {
            			add_location(h3, file, 15, 2, 210);
            			attr_dev(p, "class", "svelte-1rfnfjp");
            			add_location(p, file, 16, 2, 229);
            			attr_dev(div, "class", "container svelte-1rfnfjp");
            			add_location(div, file, 14, 0, 184);
            		},
            		m: function mount(target, anchor) {
            			insert_dev(target, div, anchor);
            			append_dev(div, h3);
            			append_dev(h3, t0);
            			append_dev(div, t1);
            			append_dev(div, p);

            			if (default_slot) {
            				default_slot.m(p, null);
            			}

            			current = true;
            		},
            		p: function update(ctx, [dirty]) {
            			if (!current || dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);

            			if (default_slot) {
            				if (default_slot.p && dirty & /*$$scope*/ 2) {
            					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, null, null);
            				}
            			}
            		},
            		i: function intro(local) {
            			if (current) return;
            			transition_in(default_slot, local);
            			current = true;
            		},
            		o: function outro(local) {
            			transition_out(default_slot, local);
            			current = false;
            		},
            		d: function destroy(detaching) {
            			if (detaching) detach_dev(div);
            			if (default_slot) default_slot.d(detaching);
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
            	validate_slots("Question", slots, ['default']);
            	let { title } = $$props;
            	const writable_props = ["title"];

            	Object.keys($$props).forEach(key => {
            		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Question> was created with unknown prop '${key}'`);
            	});

            	$$self.$$set = $$props => {
            		if ("title" in $$props) $$invalidate(0, title = $$props.title);
            		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
            	};

            	$$self.$capture_state = () => ({ title });

            	$$self.$inject_state = $$props => {
            		if ("title" in $$props) $$invalidate(0, title = $$props.title);
            	};

            	if ($$props && "$$inject" in $$props) {
            		$$self.$inject_state($$props.$$inject);
            	}

            	return [title, $$scope, slots];
            }

            class Question extends SvelteComponentDev {
            	constructor(options) {
            		super(options);
            		init(this, options, instance, create_fragment, not_equal, { title: 0 });

            		dispatch_dev("SvelteRegisterComponent", {
            			component: this,
            			tagName: "Question",
            			options,
            			id: create_fragment.name
            		});

            		const { ctx } = this.$$;
            		const props = options.props || {};

            		if (/*title*/ ctx[0] === undefined && !("title" in props)) {
            			console.warn("<Question> was created without expected prop 'title'");
            		}
            	}

            	get title() {
            		throw new Error("<Question>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
            	}

            	set title(value) {
            		throw new Error("<Question>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
            	}
            } exports('default', Question);

        }
    };
});
//# sourceMappingURL=entryQuestion.js.map
