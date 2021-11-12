Nova.booting((Vue, router, store) => {
	Vue.component('wizard-form', require('./components/Wizard.vue'))
	Vue.component('wizard-nav', require('./components/Navigator.vue'))
	Vue.component('wizard-step', require('./components/Step.vue'))

	router.beforeEach((to, from, next) => {
		var resource = _.find(Nova.config.wizard.resources, (resource) => {
			return resource.key === to.params.resourceName
		});

		if (resource !== undefined && to.name === 'create') {
			to.matched[0] = _(_.cloneDeep(to.matched[0]))
				.tap((matched) => {
					matched.components.default = require('./components/Create.vue');
				}).value();

			to.params.step = resource.step
			to.params.navigable = resource.navigable
		} else if (resource !== undefined && to.name === 'edit' && resource.update) {
			to.matched[0] = _(_.cloneDeep(to.matched[0]))
				.tap((matched) => {
					matched.components.default = require('./components/Update.vue');
				}).value();

			to.params.step = resource.step
			to.params.navigable = resource.navigable
		}

		next();
	})
})
