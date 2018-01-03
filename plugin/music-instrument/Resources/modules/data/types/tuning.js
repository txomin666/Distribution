import {t} from '#/main/core/translation'

import {TuningGroup} from '#/plugin/music-instrument/tuning/components/form/tuning-group.jsx'

const TUNING_TYPE = 'tuning'

const tuningDefinition = {
  meta: {
    type: TUNING_TYPE,
    creatable: false,
    icon: 'fa fa-fw fa-signal',
    label: t('tuning'),
    description: t('tuning_desc')
  },
  parse: (display) => display,
  render: (raw) => raw,
  validate: (value) => undefined, // todo implement
  components: {
    form: TuningGroup
    /*details: EmailLink,
    table: EmailLink*/
  }
}

export {
  TUNING_TYPE,
  tuningDefinition
}
