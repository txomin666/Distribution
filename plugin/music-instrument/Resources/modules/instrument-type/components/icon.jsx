import React, {PropTypes as T} from 'react'

import {asset} from '#/main/core/asset'

const Icon = props =>
  <svg className={`instrument-icon instrument-icon-${props.size}`}>
    <use xlinkHref={`${asset('bundles/clarolinemusicinstrument/images/instrument-icons.svg')}#icon-${props.name.toLowerCase()}`} />
  </svg>

Icon.propTypes = {
  name: T.string.isRequired,
  size: T.oneOf(['sm', 'lg'])
}

Icon.defaultProps = {
  size: 'sm'
}

export {Icon}
