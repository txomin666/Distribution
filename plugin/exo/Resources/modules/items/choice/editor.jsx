import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import get from 'lodash/get'
import classes from 'classnames'

import {trans, tex} from '#/main/core/translation'
import {ErrorBlock} from '#/main/core/layout/form/components/error-block'
import {Textarea} from '#/main/core/layout/form/components/field/textarea'
import {CheckGroup} from '#/main/core/layout/form/components/group/check-group'
import {FormGroup} from '#/main/core/layout/form/components/group/form-group'
import {RadiosGroup} from '#/main/core/layout/form/components/group/radios-group'
import {TooltipButton} from '#/main/core/layout/button/components/tooltip-button'

import {
  SCORE_SUM,
  SCORE_FIXED,
  SCORE_RULES,
  NUMBERING_LITTERAL,
  NUMBERING_NONE,
  NUMBERING_NUMERIC
} from '#/plugin/exo/quiz/enums'
import {QCM_MULTIPLE, QCM_SINGLE, actions} from '#/plugin/exo/items/choice/editor'
import {ScoreRulesGroup} from '#/plugin/exo/data/score-rules/components/form-group'

class ChoiceItem extends Component {
  constructor(props) {
    super(props)
    this.state = {showFeedback: false}
  }

  render() {
    return (
      <li
        className={classes(
          'answer-item choice-item',
          {'expected-answer' : this.props.checked},
          {'unexpected-answer' : !this.props.checked}
        )}
      >
        <input
          className="choice-item-tick"
          disabled={!this.props.fixedScore}
          type={this.props.multiple ? 'checkbox' : 'radio'}
          checked={this.props.checked}
          readOnly={!this.props.fixedScore}
          onChange={e => this.props.onChange(
            actions.updateChoice(this.props.id, 'checked', e.target.checked)
          )}
        />
        <div className="text-fields">
          <Textarea
            id={`choice-${this.props.id}-data`}
            value={this.props.data}
            onChange={data => this.props.onChange(
              actions.updateChoice(this.props.id, 'data', data)
            )}
          />
          {this.state.showFeedback &&
            <div className="feedback-container">
              <Textarea
                id={`choice-${this.props.id}-feedback`}
                value={this.props.feedback}
                onChange={text => this.props.onChange(
                  actions.updateChoice(this.props.id, 'feedback', text)
                )}
              />
            </div>
          }
        </div>

        <div className="right-controls">
          {!this.props.fixedScore &&
            <input
              title={tex('score')}
              type="number"
              className="form-control choice-score"
              value={this.props.score}
              onChange={e => this.props.onChange(
                actions.updateChoice(this.props.id, 'score', e.target.value)
              )}
            />
          }

          <TooltipButton
            id={`choice-${this.props.id}-feedback-toggle`}
            className="btn-link-default"
            title={tex('choice_feedback_info')}
            onClick={() => this.setState({showFeedback: !this.state.showFeedback})}
          >
            <span className="fa fa-fw fa-comments-o" />
          </TooltipButton>

          <TooltipButton
            id={`choice-${this.props.id}-delete`}
            className="btn-link-default"
            disabled={!this.props.deletable}
            title={trans('delete')}
            onClick={() => this.props.deletable && this.props.onChange(
              actions.removeChoice(this.props.id)
            )}
          >
            <span className="fa fa-fw fa-trash-o" />
          </TooltipButton>
        </div>
      </li>
    )
  }
}

ChoiceItem.propTypes = {
  id: T.string.isRequired,
  data: T.string.isRequired,
  score: T.number.isRequired,
  feedback: T.string.isRequired,
  multiple: T.bool.isRequired,
  fixedScore: T.bool.isRequired,
  checked: T.bool.isRequired,
  deletable: T.bool.isRequired,
  onChange: T.func.isRequired
}

const ChoiceItems = props =>
  <div className="choice-items">
    {get(props.item, '_errors.choices') &&
      <ErrorBlock text={props.item._errors.choices} warnOnly={!props.validating}/>
    }

    <ul>
      {props.item.choices.map(choice =>
        <ChoiceItem
          key={choice.id}
          id={choice.id}
          data={choice.data}
          score={choice._score}
          feedback={choice._feedback}
          multiple={props.item.multiple}
          fixedScore={-1 < [SCORE_FIXED, SCORE_RULES].indexOf(props.item.score.type)}
          checked={choice._checked}
          deletable={choice._deletable}
          onChange={props.onChange}
        />
      )}
    </ul>

    <button
      type="button"
      className="btn btn-block btn-default"
      onClick={() => props.onChange(actions.addChoice())}
    >
      <span className="fa fa-fw fa-plus"/>
      {tex('add_choice')}
    </button>
  </div>

ChoiceItems.propTypes = {
  item: T.shape({
    multiple: T.bool.isRequired,
    score: T.shape({
      type: T.string.isRequired
    }),
    choices: T.arrayOf(T.shape({
      id: T.string.isRequired,
      data: T.string.isRequired,
      _feedback: T.string,
      _checked: T.bool.isRequired,
      _deletable: T.bool.isRequired,
      _score: T.number.isRequired
    })).isRequired,
    _errors: T.object
  }).isRequired,
  validating: T.bool.isRequired,
  onChange: T.func.isRequired
}

const Choice = props =>
  <fieldset className="choice-editor">
    <RadiosGroup
      id={`item-${props.item.id}-multiple`}
      label={tex('choice_multiple')}
      hideLabel={true}
      choices={{
        [QCM_SINGLE]: tex('qcm_single_answer'),
        [QCM_MULTIPLE]: tex('qcm_multiple_answers')
      }}
      value={props.item.multiple ? QCM_MULTIPLE : QCM_SINGLE}
      onChange={value => {
        props.onChange(actions.updateProperty('multiple', value === QCM_MULTIPLE))

        if (value !== QCM_MULTIPLE && props.item.score.type === SCORE_RULES) {
          props.onChange(actions.updateProperty('score.type', SCORE_SUM))
        }
      }}
    />

    <CheckGroup
      id={`item-${props.item.id}-fixedScore`}
      value={props.item.score.type === SCORE_FIXED}
      label={tex('fixed_score')}
      onChange={checked => props.onChange(actions.updateProperty('score.type', checked ? SCORE_FIXED : SCORE_SUM))}
    />

    {props.item.score.type === SCORE_FIXED &&
      <div className="sub-fields">
        <FormGroup
          id={`item-${props.item.id}-fixedSuccess`}
          label={tex('fixed_score_on_success')}
          error={get(props.item, '_errors.score.success')}
          warnOnly={!props.validating}
        >
          <input
            id={`item-${props.item.id}-fixedSuccess`}
            type="number"
            min="0"
            value={props.item.score.success}
            className="form-control"
            onChange={e => props.onChange(actions.updateProperty('score.success', e.target.value))}
          />
        </FormGroup>
        <FormGroup
          id={`item-${props.item.id}-fixedFailure`}
          label={tex('fixed_score_on_failure')}
          error={get(props.item, '_errors.score.failure')}
          warnOnly={!props.validating}
        >
          <input
            id={`item-${props.item.id}-fixedFailure`}
            type="number"
            value={props.item.score.failure}
            className="form-control"
            onChange={e => props.onChange(actions.updateProperty('score.failure', e.target.value))}
          />
        </FormGroup>
      </div>
    }

    {props.item.multiple &&
      <CheckGroup
        id={`item-${props.item.id}-scoreRules`}
        value={props.item.score.type === SCORE_RULES}
        label={tex('score_by_rules')}
        onChange={checked => props.onChange(actions.updateProperty('score.type', checked ? SCORE_RULES : SCORE_SUM))}
      />
    }

    {props.item.multiple && props.item.score.type === SCORE_RULES &&
      <div className="sub-fields">
        <CheckGroup
          id={`item-${props.item.id}-no-wrong-choice`}
          value={props.item.score.noWrongChoice}
          label={tex('no_wrong_checked_choice_info')}
          onChange={checked => props.onChange(actions.updateProperty('score.noWrongChoice', checked))}
        />
        <ScoreRulesGroup
          id={`item-${props.item.id}-rules`}
          label={tex('rules')}
          value={props.item.score.rules || []}
          onChange={value => props.onChange(actions.updateProperty('score.rules', value))}
          error={get(props.item, '_errors.rules')}
        />
      </div>
    }

    <hr className="item-content-separator" />

    <RadiosGroup
      id={`item-${props.item.id}-numbering`}
      label={tex('choice_numbering')}
      choices={{
        [NUMBERING_NONE]: tex('quiz_numbering_none'),
        [NUMBERING_NUMERIC]: tex('quiz_numbering_numeric'),
        [NUMBERING_LITTERAL]: tex('quiz_numbering_litteral')
      }}
      value={props.item.numbering ? props.item.numbering : NUMBERING_NONE}
      onChange={numbering => props.onChange(actions.updateProperty('numbering', numbering))}
    />

    <CheckGroup
      id={`item-${props.item.id}-random`}
      value={props.item.random}
      label={tex('qcm_shuffle')}
      onChange={checked => props.onChange(actions.updateProperty('random', checked))}
    />

    <ChoiceItems {...props} />
  </fieldset>

Choice.propTypes = {
  item: T.shape({
    id: T.string.isRequired,
    multiple: T.bool.isRequired,
    random: T.bool.isRequired,
    numbering: T.string,
    score: T.shape({
      type: T.string.isRequired,
      success: T.number.isRequired,
      failure: T.number.isRequired,
      noWrongChoice: T.bool,
      rules: T.array
    }),
    choices: T.arrayOf(T.object).isRequired
  }).isRequired,
  validating: T.bool.isRequired,
  onChange: T.func.isRequired
}

export {
  Choice
}
