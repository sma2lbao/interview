##实例化Vue

1. _init(options)

    根组件：directives
    1. resolveConstructorOptions 获取全局配置 components：KeepAlive、Transition、TransitionGroup
    directives：model、show
    _base（重要API）:set、use、mixin、nextTick

    2. mergeOptions (赋值$options)
        1. normalizeProps(child, vm)
        2. normalizeInject(child, vm)
        3. normalizeDirectives(child)
        4. child.extends和child.mixins判断
        5. mergeField Object.create()继承全局配置components、directives、filters、_base
        6. return parent和child的字段
    
    3. initLifecycle
        1. $parent （根节点为undefined）
        2. $root (赋值根组件)
        3. 初始化$children
        4. 初始化$refs
        5. _watcher/_inactive/_directInactive/_isMounted/_isDestroyed/_isBeingDestroyed
    4. initEvents
        1. _events: Object.create(null)
        ...
    5. initRender
        1. 声明 _vnode/_staticTrees 
        2. $slots 、 $scopedSlots
        3. 挂载创建节点API _c = $createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
        4. 利用defineReactive为$attrs和$listeners建立响应性对象
    6. callHook - beforeCreate
        1. pushTarget
        2. popTarget
    7. initInjections
    8. initState
        1. vm._watchers 
        2. initProps
        3. initMethods
            1. 将methods的方法bind到vm上
        4. initData
            1. isReserved: Check if a string starts with $ or _
            2. proxy(vm, `_data`, key): 将_data对象代理到vm上
                Object.defineProperty(target, key, sharedPropertyDefinition)
                实际访问的是vm._data[key]
            3. observe(value, )
                1. ob变量
                2. __ob__ 标记
                3. 没有__ob__标记：ob = new Observer(value)
                    1. Observer
                        1. 声明dep变量
                        2. def(value, '__ob__', this)
                        3. isArray(value)
                            1: 否 walk(value)
                                1. walk(value)
                                2. 变量value对象属性defineReactive()
                                    defineReactive:
                                        1. dep = new Dep()
                                        2. defineProperty劫持
        5. initComputed
        6. initWatch
    9. initProvide
    10. callHook - created

    11. 如果有vm.$options.el
        1. vm.$mount(vm.$options.el)
            1. compileToFunctions 获取render和staticRenderFns
            2. mountComponent
                1. callHook - beforeMount
                2. 初始化updateComponent
                3. 实例化 new Watcher
                    ```
                    new Watcher(vm, updateComponent, noop, {
                        before () {
                        if (vm._isMounted && !vm._isDestroyed) {
                            callHook(vm, 'beforeUpdate')
                        }
                        }
                    }, true /* isRenderWatcher */)
                    ```
                    Watcher实例化
                4. callHook - mounted
