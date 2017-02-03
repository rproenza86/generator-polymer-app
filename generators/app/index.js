const _ = require('lodash')
const chalk = require('chalk')
const Generator = require('yeoman-generator')
const path = require('path')
const yosay = require('yosay')

module.exports = class extends Generator {

  initializing () {
    this.props = {
      paths: {
        bower: path.join(this.destinationRoot(), 'bower_components')
      }
    }
  }

  prompting () {
    const config = this.config.getAll()
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the prime ' + chalk.red('polymer-app') + ' generator!'
    ))

    if (config && config.promptValues && config.promptValues.src) {
      this.log('USING CACHE')
    }

    const prompts = [
      {
        type: 'list',
        choices: ['collection'],
        name: 'subgenerator',
        message: 'What would you like to make?'
      },
      {
        type: 'input',
        name: 'src',
        message: 'Which is your source path?',
        default: 'src',
        store: true
      }
    ]

    return this.prompt(prompts).then(props => {
      _.merge(this.props, {
        paths: {
          src: path.join(this.destinationRoot(), props.src)
        }
      })

      if (props.subgenerator === 'collection') {
        this.composeWith(require.resolve('../collection'))
      }
    })
  }

  configuring () {
    this.config.set('paths', this.props.paths)
    this.config.save()
  }

  writing () {
  }

  install () {
  }
}
