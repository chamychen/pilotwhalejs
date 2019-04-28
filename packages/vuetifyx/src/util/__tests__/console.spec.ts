import { consoleWarn, consoleError } from '../console'
import toHaveBeenWarnedInit from '../../../test/util/to-have-been-warned'

describe('console', () => {
  toHaveBeenWarnedInit()

  it('should generate a warning', () => {
    consoleWarn('foo')
    expect('[Vuetifyx] foo').toHaveBeenTipped()

    consoleWarn('bar', { _isVue: true, $options: { name: 'baz' } })
    expect('[Vuetifyx] bar\n\n(found in <Baz>)').toHaveBeenTipped()
  })

  it('should generate an error', () => {
    consoleError('foo')
    expect('[Vuetifyx] foo').toHaveBeenWarned()

    consoleError('bar', { _isVue: true, $options: { name: 'baz' } })
    expect('[Vuetifyx] bar\n\n(found in <Baz>)').toHaveBeenWarned()
  })
})
