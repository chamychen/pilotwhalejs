import { VNodeData } from 'vue'

/**
 * Removes duplicate `@input` listeners when
 * using v-model with functional components
 *
 * @see https://github.com/vuetifyjs/vuetifyx/issues/4460
 */
/* eslint-disable indent */
/* eslint-disable no-tabs */
export default (data: VNodeData) => {
	if (data.model && data.on && data.on.input) {
		if (Array.isArray(data.on.input)) {
			if (data.model.callback) {
				const i = data.on.input.indexOf(data.model.callback)
				if (i > -1) {
					data.on.input.splice(i, 1)
				}
			}
		} else {
			delete data.on.input
		}
	}
}
/* eslint-enable indent */
/* eslint-enable no-tabs */
