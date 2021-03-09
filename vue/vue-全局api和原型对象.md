##原型对象和全局API
    1. 从core/instance/index导入Vue
        1. initMixin(Vue)
            1. 给Vue.prototype._init定义方法 （初始化组件）
        2. stateMixin(Vue)
            1. 劫持Vue.prototype的$data和$props指向this._data和this._props
            2. 挂载Vue.prototype.$set和Vue.prototype.$delete API
            3. 定义Vue.prototype.$watch方法 返回unwatchFn函数用于去掉watch的监听
        3. eventsMixin(Vue)
            1. 挂载Vue.prototype.$on、$once、$off、$emit
        4. lifecycleMixin(Vue)
            1. 挂载Vue.prototype._update（diff算法开始）重要
            2. 挂载Vue.prototype.$forceUpdate
            3. 挂载Vue.prototype.$destroy
        5. renderMixin(Vue)
            1. installRenderHelpers(Vue.prototype) （Util方法）
            2. Vue.prototype.$nextTick
            3. 挂载Vue.prototype._render （执行render会返回VNode）


    2. initGlobalAPI 初始化全局对象
        1. 劫持Vue.config属性
        2. Vue.util对象增加 warn、extend、mergeOptions、defineReactive
        3. Vue.set、Vue.delete、Vue.nextTick
        4. Vue.options设置 components，directives，filters
        5. Vue.options设置 _base (全局Vue对象)
        6. 继承builtInComponents
        7. initUse：声明Vue.use函数
        8. initMixin: 声明Vue.mixin函数，（将mixin merge到vm.options）
        9. initExtend: 声明Vue.extend函数，
        10. initAssetRegisters：声明Vue.component及Vue.directive函数
            1.Vue.component方法：
                1. 没有定义definition方法，说明是取值操作
                2. 有定义definition方法，说明是定义操作
                    1. this.options._base.extend(definition)
                        1. 组件可以定义当前组件的组件
                        2. this为Vue时，是全局组件
            2.Vue.directive方法：
                1. 没有定义definition方法，说明是取值操作
                2. 有定义definition方法，说明是定义操作
                    1. definition = { bind: definition, update: definition }
            3. 绑定到实例上（或全局）
                this.options[type + 's'][id] = definition
    3. $isServer，$ssrContext绑定到Vue.prototype
    4. 劫持Vue.FunctionalRenderContext
