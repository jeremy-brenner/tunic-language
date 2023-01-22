import { createApp } from 'vue'
import App from './App.vue'
import * as input from './lib/input';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
    faTrashCan, 
    faAngleUp, 
    faAngleDown, 
    faAngleLeft,
    faAngleRight,
    faPencil, 
    faForwardStep, 
    faForwardFast ,
    faBackwardStep,
    faBackwardFast,
    faDumpsterFire,
    faCircleXmark,
    faRightLeft,
    faArrowsRotate,
    faFloppyDisk,
    faDownload,
    faUpload,
} from '@fortawesome/free-solid-svg-icons'

library.add(faTrashCan)
library.add(faAngleUp)
library.add(faAngleDown)
library.add(faAngleLeft)
library.add(faAngleRight)
library.add(faPencil)
library.add(faForwardStep)
library.add(faForwardFast)
library.add(faBackwardStep)
library.add(faBackwardFast)
library.add(faDumpsterFire)
library.add(faCircleXmark)
library.add(faRightLeft)
library.add(faArrowsRotate)
library.add(faFloppyDisk)
library.add(faDownload)
library.add(faUpload)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')

input.start();