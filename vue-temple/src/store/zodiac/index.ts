import { VuexModule } from 'vuex-module-decorators'
import { namespace } from 'vuex-class'

const name = 'ZodiacStore'

export class ZodiacClass extends VuexModule {

}

export const ZodiacStore = namespace(name)