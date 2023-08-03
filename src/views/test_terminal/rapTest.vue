<template>
  <div class="rap">
    <input class="input" />
    <!-- <div contenteditable class="input"></div> -->
    <span
      style="
        position: relative;
        animation: jumping 0.2s infinite;
        animation-direction: alternate;
      "
      >q</span
    >
    <span class="eyeballSleeping">q</span>
    <span class="eyeballSleeping">q</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      jum: 'animation: jumping 0.8s linear infinite;'

    }
  },
  created () {

  },
  mounted () {
    const inputEl = document.querySelector('.input')
    inputEl.addEventListener('blur', (e) => {
      this.withElType(e.target)
    })
  },

  methods: {
    withElType (el) {
      const type = el.tagName
      switch (type) {
        case 'DIV':
          const text = el.innerText.trim()
          el.innerHTML = ''
          if (text) {
            setTimeout(() => this.appendJumpingLetters(text, el))
          }
          break
        case 'INPUT':
          if (el.value) {
            const newDivEl = this.replaceInput(el)
            this.appendJumpingLetters(el.value, newDivEl)

            newDivEl.addEventListener('click', () => {
              el.style.display = 'inline-block'
              el.focus()
              newDivEl.parentNode.removeChild(newDivEl)
            })
          }
          break
      }
    },
    replaceInput (inputEl) {
      const newDivEl = document.createElement('div')
      const inputStyles = window.getComputedStyle(inputEl)
      for (let styleProp of inputStyles) {
        newDivEl.style[styleProp] = inputStyles.getPropertyValue(styleProp)
      }
      newDivEl.style.boxSizing = 'border-box'

      // 由于 input 设置了 `line-height` 和 `broder`，所以我们需要垂直居中，采用 FlexBox 的方式来解决
      // 同时 input 也设置了 `text-align`，所以我们需要将其转换为 `justify-content`
      newDivEl.style.display = 'inline-flex'
      newDivEl.style.alignItems = 'center'
      if (newDivEl.style.textAlign === 'center') {
        newDivEl.style.justifyContent = 'center'
      } else if (newDivEl.style.textAlign === 'right') {
        newDivEl.style.justifyContent = 'flex-end'
      }

      // 将其插入到input之后
      inputEl.insertAdjacentElement('afterend', newDivEl)
      // 隐藏原有的 input
      inputEl.style.display = 'none'

      return newDivEl
    },
    appendJumpingLetters (value, parentNode) {
      for (let i = 0; i < value.length; i++) {
        const spanEl = document.createElement('span')
        spanEl.innerText = value[i]
        // 动画，给每一个动画加上延迟
        const delay = -i * 0.3
        spanEl.style.animation = 'jumping 0.8s linear infinite ' + delay + 's'
        console.log(spanEl)
        parentNode.appendChild(spanEl)
      }
    }
  }
}
</script>

<style scoped>
.arp {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #7ec699;
  flex-direction: column;
  height: 100vh;
}

.input {
  background: #fff;
  width: 80vw;
  height: 50px;
  outline: none;
  border: 5px solid #81d59f;
  text-align: center;
  line-height: 50px;
  border-radius: 25px;
  font-size: 16px;
}
/* css转换+动画 */
.eyeballSleeping {
  /* animation: jumping 0.8s linear infinite; */
  position: relative;
  animation: jumping 0.2s infinite;
  animation-direction: alternate;
}
@keyframes mymove {
  from {
    left: 0px;
  }
  to {
    left: 200px;
  }
}
@keyframes jumping {
  /* 25% {
    transform: translateY(-10px);
  }
  75% {
    transform: translateY(10px);
  } */
  from {
    top: -10px;
  }
  to {
    top: 10px;
  }
}
</style>
