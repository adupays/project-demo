'use strict'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import extend from 'extend'
import formConfig from './formConfig'

class Module extends Component {
  constructor() {
    super()
    // fetch API
    this.data = {}
    this.references = {}
  }

  componentWillReceiveProps(nextProps) {
    // handle server response, prefill and format data
    this.data = nextProps.data
  }

  generateForm() {
    const fields = []
    // get form from JSON config
    for (const f in formConfig) {
      const field = formConfig[f]
      const callbacks = {} // prefill with all callbacks for fields dependancies

      let key = field.name
      let value = this.data[f]
      fields.push(this.generateInput(field, key, value, this.references, callbacks))
    }
    return fields
  }

  // all our components are stateless
  generateInput(config, key, value, references, callback = {}) {
    let input = null
    const fieldName = config.name
    const fieldRef = config.ref

    switch (config.type) {
      case 'autocomplete':
        input = (
          <Autocomplete
            key={key}
            field={config}
            name={fieldName}
            defaultValue={value}
            search={callback[config.onChange] }
            onClick={callback[config.onClick] }
            ref={references && fieldRef ? c => references[fieldRef] = c : void 0} />
        )
        break
      case 'select':
        input = (
          <Select
            key={key}
            field={config}
            name={fieldName}
            onClick={callback[config.onClick]}
            ref={references && fieldRef ? c => references[fieldRef] = c : void 0}
            defaultValue={value}
          />
        )
        break
      case 'simpleEditor':
        input = (
          <SimpleEditor
            key={key}
            fieldName={fieldName}
            references={references}
            ref={value && value.html ? void 0 : c => references[fieldName] = c}
            placeholder={config.placeholder}
            title={config.title}
            value={value}
          />
        )
        break
      case 'file':
        input = (
          <InputFile
            key={key}
            name={fieldName}
            ref={references && fieldRef ? c => references[fieldRef] = c : void 0}
            onChange={callback[config.onChange]}
            field={config}
          />
        )
        break
      default:
        input = (
          <InputField
            key={key}
            field={config}
            name={fieldName}
            ref={references && fieldRef ? c => references[fieldRef] = c : void 0}
            defaultValue={value}
            onChange={callback[config.onChange]}
            onClick={callback[config.onClick]}
            value={config.value}
          />
        )
    }
    return input
  }

  // post this.data to API
  saveData() {
    this.savingReferences()
    // API call...
  }

  savingReferences() {
    // loop on all fields reference and retrieve current value
    for (const field in this.references) {
      const component = this.references[field]

      if (component) {
        const value = component.value !== void 0
          ? component.value
          : void 0

        // save all fields value in this.data
        if (value !== void 0) {
          this.data[field] = value
        }
      }
    }
  }

  render() {
    return (
      <div>
        <div>Title</div>
        <form onSubmit={ this.saveData.bind(this) }>
          { this.generateForm() }
          <button type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default Module
