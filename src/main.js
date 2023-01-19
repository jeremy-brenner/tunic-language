import { createApp } from 'vue'
import App from './App.vue'


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
    faTrashCan, 
    faAngleUp, 
    faAngleDown, 
    faPencil, 
    faForwardStep, 
    faForwardFast ,
    faBackwardStep,
    faBackwardFast,
    faDumpsterFire,
    faCircleXmark,
    faRightLeft,
    faArrowsRotate,
} from '@fortawesome/free-solid-svg-icons'

library.add(faTrashCan)
library.add(faAngleUp)
library.add(faAngleDown)
library.add(faPencil)
library.add(faForwardStep)
library.add(faForwardFast)
library.add(faBackwardStep)
library.add(faBackwardFast)
library.add(faDumpsterFire)
library.add(faCircleXmark)
library.add(faRightLeft)
library.add(faArrowsRotate)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
