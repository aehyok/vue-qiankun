import { ObjectDirective } from 'vue'

const foucsDirective: ObjectDirective<HTMLElement, unknown> = {
  mounted(el) {
    switch (el.tagName) {
      case 'INPUT':
        el.focus()
        break
      default:
        const input = el.querySelector('input')
        input?.focus()
        break
    }
  }
}

export default foucsDirective
