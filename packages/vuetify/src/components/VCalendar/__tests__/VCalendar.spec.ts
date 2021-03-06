import { parseDate } from '../util/timestamp'
import VCalendar from '../VCalendar'
import {
  mount,
  Wrapper,
  MountOptions
} from '@vue/test-utils'
import { ExtractVue } from '../../../util/mixins'

describe('VCalendar', () => {
  type Instance = ExtractVue<typeof VCalendar>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VCalendar, {
        ...options,
        mocks: {
          $vuetify: {
            lang: {
              current: 'en-US'
            }
          }
        }
      })
    }
  })

  it('should render day view', async () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'day',
        start: '2018-01-29',
        end: '2018-02-04',
        now: '2019-02-17'
      },
      methods: {
        getNow: () => parseDate(new Date('2019-02-17'))
      }
    })

    expect(wrapper.classes('v-calendar-daily')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render week view', async () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'week',
        start: '2018-01-29',
        end: '2018-02-04',
        now: '2019-02-17'
      },
      methods: {
        getNow: () => parseDate(new Date('2019-02-17'))
      }
    })

    expect(wrapper.classes('v-calendar-daily')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render month view', async () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'month',
        start: '2018-01-29',
        end: '2018-02-04',
        now: '2019-02-17'
      },
      methods: {
        getNow: () => parseDate(new Date('2019-02-17'))
      }
    })

    expect(wrapper.classes('v-calendar-monthly')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should parse value', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2019-02-02',
        start: '2019-01-29',
        end: '2019-02-04'
      }
    })

    expect(wrapper.vm.parsedValue.date).toBe('2019-02-02')
  })

  it('should parse start', async () => {
    const wrapper = mountFunction({
      propsData: {
        start: '2019-01-29',
        end: '2019-02-04'
      }
    })

    expect(wrapper.vm.parsedValue.date).toBe('2019-01-29')
  })

  it('should calculate end', async () => {
    const wrapper = mountFunction({
      propsData: {
        end: '2018-12-04'
      }
    })

    expect(wrapper.vm.parsedValue.date).toEqual(new Date().toISOString().split('T')[0])
  })
})
