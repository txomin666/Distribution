import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import set from 'lodash/set'

import {trans, transChoice} from '#/main/core/translation'

import {MODAL_CONFIRM} from '#/main/app/modals/confirm'

import {actions as modalActions} from '#/main/app/overlay/modal/store'
import {actions} from '#/main/core/administration/appearance/theme/actions'

import {select} from '#/main/core/administration/appearance/theme/selectors'
import {validate} from '#/main/core/administration/appearance/theme/validator'

import {
  PageContainer,
  PageHeader,
  PageContent,
  PageGroupActions,
  PageActions,
  PageAction,
  MoreAction
} from '#/main/core/layout/page/index'
import {LINK_BUTTON, CALLBACK_BUTTON} from '#/main/app/buttons'

/*import {HelpBlock}    from '#/main/core/layout/form/components/help-block.jsx'*/
//import {FormSection, FormSections} from '#/main/app/content/form/components/sections.jsx'
import {FormGroup}    from '#/main/core/layout/form/components/group/form-group.jsx'
import {CheckGroup}   from '#/main/core/layout/form/components/group/check-group.jsx'
import {TextGroup}    from '#/main/core/layout/form/components/group/text-group.jsx'
import {ToggleableSet} from '#/main/core/layout/form/components/fieldset/toggleable-set.jsx'

/*import {Color}        from './fields/color.jsx'
import {FontSize}     from './fields/font-size.jsx'
import {FontSelector} from './fields/font-selector.jsx'
import {Size}         from './fields/size.jsx'*/

const GeneralSection = props =>
  <div className="panel panel-default">
    <fieldset className="panel-body">
      <h2 className="sr-only">General properties</h2>

      {props.theme.meta.plugin &&
        <FormGroup
          id="theme-plugin"
          label={trans('theme_plugin', {}, 'theme')}
        >
          <div id="theme-plugin">{props.theme.meta.plugin}</div>
        </FormGroup>
      }

      <TextGroup
        id="theme-name"
        label={trans('theme_name', {}, 'theme')}
        value={props.theme.name}
        onChange={value => props.updateProperty('name', value)}
      />

      <TextGroup
        id="theme-description"
        label={trans('theme_description', {}, 'theme')}
        value={props.theme.meta.description}
        long={true}
        onChange={value => props.updateProperty('meta.description', value)}
      />

      <CheckGroup
        id="theme-default"
        label={trans('theme_is_not_default', {}, 'theme')}
        labelChecked={trans('theme_is_default', {}, 'theme')}
        value={props.theme.meta.default}
        disabled={true}
        onChange={() => true}
      />

      <ToggleableSet
        showText={trans('show_advanced_options')}
        hideText={trans('hide_advanced_options')}
      >
        <CheckGroup
          id="theme-enabled"
          label={trans('theme_enabled', {}, 'theme')}
          value={props.theme.meta.enabled}
          disabled={props.theme.meta.default || props.theme.current}
          onChange={checked => props.updateProperty('meta.enabled', checked)}
          help={trans('theme_enabled_help', {}, 'theme')}
        />

        <CheckGroup
          id="theme-extend-default"
          label={trans('theme_extend_default', {}, 'theme')}
          value={props.theme.parameters.extendDefault}
          disabled={!props.theme.meta.custom}
          onChange={checked => props.updateProperty('parameters.extendDefault', checked)}
          help={trans('theme_extend_default_help', {}, 'theme')}
        />
      </ToggleableSet>
    </fieldset>
  </div>

GeneralSection.propTypes = {
  theme: T.shape({
    name: T.string.isRequired,
    current: T.bool.isRequired,
    meta: T.shape({
      plugin: T.string,
      description: T.string,
      enabled: T.bool,
      default: T.bool,
      custom: T.bool
    }).isRequired,
    parameters: T.shape({
      extendDefault: T.bool
    }).isRequired
  }).isRequired,
  updateProperty: T.func.isRequired
}

/*const TypoSection = props =>
  <FormSection
    {...props}
    icon="fa fa-fw fa-font"
    title="Typo & fonts"
  >
    <fieldset>
      <legend>{trans('font_headings', {}, 'theme')}</legend>
      <div className="sub-fields">
        <FontSelector
          controlId="headings-font"
          value="Century Gothic"
          onChange={(value) => true}
        />
        <FontSize controlId="headings-size" />
      </div>
    </fieldset>

    <fieldset>
      <legend>{trans('font_content', {}, 'theme')}</legend>
      <div className="sub-fields">
        <FontSelector
          controlId="content-font"
          value="Arial"
          onChange={(value) => true}
        />
        <FontSize controlId="content-size" />
      </div>
    </fieldset>
  </FormSection>

TypoSection.propTypes = {
  updateProperty: T.func.isRequired
}

const ColorsSection = props =>
  <FormSection
    {...props}
    icon="fa fa-fw fa-tint"
    title="Color schemes"
  >
    <div className="form-group">
      <label className="control-label">Primary & secondary</label>
      <div className="row primary-colors">
        <div className="col-md-6">
          <Color color="#148AC7" label={{text: 'primary', color: '#FFFFFF'}} />
          <HelpBlock help="Primary color is used to highlight important components." />
        </div>

        <div className="col-md-6">
          <Color color="#C51162" label={{text: 'secondary', color: '#FCD9E9'}} />
          <HelpBlock help="Secondary color is used to highlight user progression components." />
        </div>
      </div>
    </div>

    <div className="form-group">
      <label className="control-label">States</label>

      <div className="row semantic-colors">
        <div className="col-md-3">
          <Color color="#4F7302" label={{text : 'success', color: '#DAFD8D'}} />
        </div>

        <div className="col-md-3">
          <Color color="#ED9E2F" label={{text : 'warning', color: '#FAE0BC'}} />
        </div>

        <div className="col-md-3">
          <Color color="#BF0404" label={{text : 'danger', color: '#FFD5D5'}} />
        </div>

        <div className="col-md-3">
          <Color color="#024F73" label={{text : 'info', color: '#C9EDFE'}} />
        </div>
      </div>

      <a href="">
        <span className="fa fa-fw fa-retweet" /> Show reverse
      </a>
    </div>

    <div className="form-group">
      <label className="control-label">Gray scale</label>
      <div className="gray-scale">
        <Color color="#000000" />
        <Color color="#222222" />
        <Color color="#333333" />
        <Color color="#555555" />
        <Color color="#777777" />
        <Color color="#EEEEEE" />
        <Color color="#FFFFFF" />
      </div>
    </div>

    <div className="form-group layout-colors">
      <label className="control-label">Layout</label>
      <Color color="#262626" label={{text: 'header',  color: '#BFBFBF'}} style={{borderBottom: '3px solid #148ac7'}} />
      <Color color="#FAFAFA" label={{text: 'content', color: '#333333'}} />
      <Color color="#F3F3F3" label={{text: 'footer',  color: '#777777'}} />
    </div>
  </FormSection>

ColorsSection.propTypes = {
  updateProperty: T.func.isRequired
}

const SizingSection = props =>
  <FormSection
    {...props}
    icon="fa fa-fw fa-arrows-h"
    title="Sizing"
  >
    <Size
      controlId="app-width"
      label={trans('app_max_width', {}, 'theme')}
      value={1200}
      onChange={(value) => true}
    />
  </FormSection>

SizingSection.propTypes = {
  updateProperty: T.func.isRequired
}

const ExtraSection = props =>
  <FormSection
    {...props}
    icon="fa fa-fw fa-ellipsis-h"
    title="Extra features"
  >
    <CheckGroup
      checkId="enable-shadows"
      label={trans('enable_shadows', {}, 'theme')}
      checked={true}
      onChange={active => true}
    />

    <CheckGroup
      checkId="enable-border-radius"
      label={trans('enable_border_radius', {}, 'theme')}
      checked={true}
      onChange={active => true}
    />
  </FormSection>

ExtraSection.propTypes = {
  updateProperty: T.func.isRequired
}*/

class Theme extends Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: cloneDeep(props.theme),
      pendingChanges: false,
      validating: false,
      errors: {}
    }

    this.save = this.save.bind(this)
    this.updateProperty = this.updateProperty.bind(this)
  }

  /**
   * Saves the theme updates if valid.
   */
  save() {
    const errors = validate(this.state.theme)

    this.setState({
      validating: true,
      errors: errors
    })

    if (isEmpty(errors)) {
      this.props.saveTheme(this.state.theme)
    }
  }

  /**
   * Updates a property in the theme.
   *
   * @param {string} parameter - the path of the parameter in the theme (eg. 'meta.enabled')
   * @param value
   */
  updateProperty(parameter, value) {
    // Update state and validate new resourceNode data
    this.setState((prevState) => {
      const newTheme = cloneDeep(prevState.theme)
      set(newTheme, parameter, value)

      return {
        theme: newTheme,
        pendingChanges: true,
        validating: false,
        errors: validate(newTheme)
      }
    })
  }

  render() {
    return (
      <PageContainer id="theme-form">
        <PageHeader
          title={trans('themes_management')}
          subtitle={this.props.theme.name}
        >
          <PageActions>
            <PageGroupActions>
              <PageAction
                type={LINK_BUTTON}
                label={trans('save_theme', {}, 'theme')}
                icon="fa fa-save"
                primary={true}
                disabled={!this.state.pendingChanges || (this.state.validating && !isEmpty(this.state.errors))}
                target="/"
              />
            </PageGroupActions>

            <PageGroupActions>
              <PageAction
                type={LINK_BUTTON}
                label={trans('themes_list', {}, 'theme')}
                icon="fa fa-list"
                target="/"
              />

              <MoreAction
                actions={[
                  {
                    type: CALLBACK_BUTTON,
                    icon: 'fa fa-fw fa-refresh',
                    label: trans('rebuild_theme', {}, 'theme'),
                    callback: () => this.props.rebuildTheme(this.props.theme)
                  }, {
                    type: CALLBACK_BUTTON,
                    icon: 'fa fa-fw fa-trash',
                    label: trans('delete_theme', {}, 'theme'),
                    callback: () => this.props.removeTheme(this.props.theme),
                    dangerous: true
                  }
                ]}
              />
            </PageGroupActions>
          </PageActions>
        </PageHeader>

        <PageContent>
          <GeneralSection theme={this.state.theme} updateProperty={this.updateProperty} />

          {/*<FormSections>
           <ColorsSection />
           <TypoSection />
           <SizingSection />
           <ExtraSection />
           </FormSections>*/}
        </PageContent>
      </PageContainer>
    )
  }
}

Theme.propTypes = {
  theme: T.shape({
    name: T.string.isRequired,
    current: T.bool.isRequired,
    meta: T.shape({
      description: T.string,
      enabled: T.bool
    }).isRequired,
    parameters: T.shape({
      extendDefault: T.bool
    }).isRequired
  }).isRequired,
  saveTheme: T.func.isRequired,
  rebuildTheme: T.func.isRequired,
  removeTheme: T.func.isRequired
}

function mapStateToProps(state, onwProps) {
  return {
    theme: select.themes(state).find(theme => onwProps.match.params.id === theme.id)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveTheme: (theme) => {
      dispatch(actions.saveTheme(theme))
    },

    rebuildTheme: (theme) => {
      dispatch(
        modalActions.showModal(MODAL_CONFIRM, {
          title: transChoice('rebuild_themes', 1, {count: 1}, 'theme'),
          question: trans('rebuild_themes_confirm', {
            theme_list: theme.name
          }, 'theme'),
          handleConfirm: () => dispatch(actions.rebuildThemes([theme]))
        })
      )
    },

    removeTheme: (theme) => {
      dispatch(
        modalActions.showModal(MODAL_CONFIRM, {
          title: transChoice('remove_themes', 1, {count: 1}, 'theme'),
          dangerous: true,
          icon: 'fa fa-fw fa-trash-o',
          question: trans('remove_themes_confirm', {
            theme_list: theme.name
          }, 'theme'),
          handleConfirm: () => dispatch(actions.deleteThemes([theme]))
        })
      )
    }
  }
}

const ConnectedTheme = withRouter(connect(mapStateToProps, mapDispatchToProps)(Theme))

export {
  ConnectedTheme as Theme
}
