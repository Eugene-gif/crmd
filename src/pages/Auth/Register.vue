<template>
  <q-page class="page-register">
    <LoaderDate
      v-show="loading"
    />
    <!-- @reset="onReset" -->
    <q-form
      @submit="onSubmit"
      
      class="q-gutter-md"
    >
      <div class="form-section">
        <div class="head">
          <q-item to="/login">
            <span>Вход</span>
          </q-item>
          <q-item to="/register">
            <span>Регистрация</span>
          </q-item>
          <q-item></q-item>
        </div>
        <!-- <canvas ref="figure"></canvas> -->
        <!-- <q-input
          filled
          type="text"
          v-model="form.login"
          placeholder="Ваш логин"
          class="input-auth"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']"
        /> -->

        <div class="form-cell">
          <div class="item">
            <q-input
              filled
              type="text"
              v-model="form.name"
              placeholder="Ваше имя"
              class="input-auth"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '']"
            />
            <q-input
              filled
              type="text"
              v-model="form.lastName"
              placeholder="Ваша фамилия"
              class="input-auth"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '']"
            />
          </div>
          <div class="item">
            <div class="my-file-upload my-file-upload-rounded">
              <q-uploader
                url="http://localhost:8080/upload"
                style="max-width: 300px"
                @added="onFileChange"
              />
            </div>
          </div>
        </div>

        <q-input
          filled
          type="email"
          v-model="form.email"
          placeholder="Ваш e-mail (он же логин)"
          class="input-auth input-email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '']"
        />

        <q-input
          filled
          :type="passEye1 ? 'password' : 'text'"
          v-model="form.password"
          placeholder="Пароль"
          class="input-auth pass-input"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || ''
          ]"
        >
          <template v-slot:after @click="passEye1">
            <q-icon
              @click="passEye1 = !passEye1"
              v-show="!passEye1"
              name="svguse:icons/allIcons.svg#eye-no"
            />
            <q-icon
              @click="passEye1 = !passEye1"
              v-show="passEye1"
              name="svguse:icons/allIcons.svg#eye-yes"
            />
          </template>
        </q-input>

        <q-input
          filled
          :type="passEye2 ? 'password' : 'text'"
          v-model="form.confirmPassword"
          placeholder="Повторите пароль"
          class="input-auth pass-input"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || ''
          ]"
        >
          <template v-slot:after @click="passEye1">
            <q-icon
              @click="passEye2 = !passEye2"
              v-show="!passEye2"
              name="svguse:icons/allIcons.svg#eye-no"
            />
            <q-icon
              @click="passEye2 = !passEye2"
              v-show="passEye2"
              name="svguse:icons/allIcons.svg#eye-yes"
            />
          </template>
        </q-input>
        
        <div class="dop-info row items-center justify-between">
          <q-checkbox
            v-model="policy"
            checked-icon="svguse:icons/allIcons.svg#check"
            class="my-checkbox flat"
            color="black"
          >
            Я принимаю<q-item to="/policy" class="q-item-none">политику конфиденциальности.</q-item>
          </q-checkbox>
        </div>
        
        <div class="section-btn">
          <q-btn
            unelevated
            no-caps
            type="submit"
            padding="20px 10px"
            class="full-width bg-positive text-white my-btn my-effect h-dark q-btn-actions"
            label="Зарегистрироваться"
          />
        </div>
      </div>
      <div class="form-section form-auth">
        <LoginIn />
      </div>
    </q-form>
    <AuthInformation />
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex';
import { authApi } from 'src/api/auth';
import { useQuasar } from 'quasar'

import AuthInformation from 'src/components/auth/AuthInformation.vue'
import LoginIn from 'src/components/auth/LoginIn.vue'
import LoaderDate from 'src/components/LoaderDate.vue'

export default {
  components: {
    AuthInformation,
    LoginIn,
    LoaderDate
  },
  setup () {
    const accept = ref(false)
    const store = useStore();    
    const policy = ref(true);
    const $q = useQuasar()

    const form = ref({
      login: '',
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      image: ''
    })   
    const isValidPass = computed(() => {
      return form.value.password == form.value.confirmPassword
    })    

    const passEye1 = ref(true)    
    const passEye2 = ref(true)

    const loading = ref(false);

    async function onSubmit () {
      loading.value = true
      if (isValidPass.value) {
        try {
          await authApi.doRegister(form.value).then(resp => {
            const token = resp.data.data.token
            store.commit('auth/setToken', token)
            let userInfo = JSON.stringify(resp.data.data.user)
            localStorage.setItem('userInfo', userInfo)
            
            window.location.href = '/';
          })
          loading.value = false
        } catch (err) {
          console.log(err)
          loading.value = false
          setTimeout(() => {
            $q.notify({
              color: 'red',
              timeout: 3000,
              message: 'Такой e-mail уже зарегистрирован'
            })
          }, 0)
        }
      } else {
        loading.value = false
        setTimeout(() => {
          $q.notify({
            color: 'red',
            timeout: 3000,
            message: 'пароли должны совпадать'
          })
        }, 0)
      }
    }

    function onFileChange(file) {
      console.log(file)
      let uploadFile = file[0]
      form.value.image = uploadFile
    }

    // генерация картинки
    const figure = ref()
    const link = ref()

    function addColor(letter) {
      let palette = [
        {color: '#6C5DD3'},
        {color: '#58A334'},
        {color: '#EC6944'},
        {color: '#CD3F5C'},
        {color: '#EB872B'},
        {color: '#2CA7CA'},
        {color: '#03AA82'}
      ]
      let i = 0
      let letters = [
        {
          number: 'а',
          colorNumber: ''
        },
        {
          number: 'б',
          colorNumber: ''
        },
        {
          number: 'в',
          colorNumber: ''
        },
        {
          number: 'г',
          colorNumber: ''
        },
        {
          number: 'д',
          colorNumber: ''
        },
        {
          number: 'е',
          colorNumber: ''
        },
        {
          number: 'ж',
          colorNumber: ''
        },
        {
          number: 'з',
          colorNumber: ''
        },
        {
          number: 'и',
          colorNumber: ''
        },
        {
          number: 'к',
          colorNumber: ''
        },
        {
          number: 'л',
          colorNumber: ''
        },
        {
          number: 'м',
          colorNumber: ''
        },
        {
          number: 'н',
          colorNumber: ''
        },
        {
          number: 'о',
          colorNumber: ''
        },
        {
          number: 'п',
          colorNumber: ''
        },
        {
          number: 'р',
          colorNumber: ''
        },
        {
          number: 'с',
          colorNumber: ''
        },
        {
          number: 'т',
          colorNumber: ''
        },
        {
          number: 'у',
          colorNumber: ''
        },
        {
          number: 'ф',
          colorNumber: ''
        },
        {
          number: 'х',
          colorNumber: ''
        },
        {
          number: 'ц',
          colorNumber: ''
        },
        {
          number: 'ч',
          colorNumber: ''
        },
        {
          number: 'ш',
          colorNumber: ''
        },
        {
          number: 'щ',
          colorNumber: ''
        },
        {
          number: 'ы',
          colorNumber: ''
        },
        {
          number: 'э',
          colorNumber: ''
        },
        {
          number: 'ю',
          colorNumber: ''
        },
        {
          number: 'я',
          colorNumber: ''
        },
        {
          number: 'a',
          colorNumber: ''
        },
        {
          number: 'b',
          colorNumber: ''
        },
        {
          number: 'c',
          colorNumber: ''
        },
        {
          number: 'd',
          colorNumber: ''
        },
        {
          number: 'e',
          colorNumber: ''
        },
        {
          number: 'f',
          colorNumber: ''
        },
        {
          number: 'g',
          colorNumber: ''
        },
        {
          number: 'h',
          colorNumber: ''
        },
        {
          number: 'i',
          colorNumber: ''
        },
        {
          number: 'j',
          colorNumber: ''
        },
        {
          number: 'k',
          colorNumber: ''
        },
        {
          number: 'l',
          colorNumber: ''
        },
        {
          number: 'm',
          colorNumber: ''
        },
        {
          number: 'n',
          colorNumber: ''
        },
        {
          number: 'o',
          colorNumber: ''
        },
        {
          number: 'p',
          colorNumber: ''
        },
        {
          number: 'q',
          colorNumber: ''
        },
        {
          number: 'r',
          colorNumber: ''
        },
        {
          number: 's',
          colorNumber: ''
        },
        {
          number: 't',
          colorNumber: ''
        },
        {
          number: 'u',
          colorNumber: ''
        },
        {
          number: 'v',
          colorNumber: ''
        },
        {
          number: 'w',
          colorNumber: ''
        },
        {
          number: 'x',
          colorNumber: ''
        },
        {
          number: 'y',
          colorNumber: ''
        },
        {
          number: 'z',
          colorNumber: ''
        }
      ]
      letters.map((el) => {
        if (i === 6) {
          i = 0
        } else {
          i++
        }
        el.colorNumber = palette[i].color
      })
      let color
      letters.filter(el => {
        if (el.number === letter) {
          return color = el.colorNumber
        }
      })
      return color
    }
    function random() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

      for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      let data = `${new Date()}`
      let dataSplit = data.split(' ')
      let dataSplit4 = dataSplit[4].split(':')
      let arrData = `${dataSplit[0]}${dataSplit[1]}${dataSplit[2]}${dataSplit[3]}${dataSplit4[0]}${dataSplit4[1]}${dataSplit4[2]}`
      return `${text}${arrData}`;
    }
    function generateImage(canvas, colorBkg) {
      const ctx = canvas.getContext('2d')
      const ctxText = canvas.getContext('2d')
      let image = new Image()

      canvas.width = 314
      canvas.height = 314

      ctx.beginPath()

      ctxText.font = 'normal 110px graphik, sans-serif'
      ctxText.fillStyle = 'white'
      ctxText.globalCompositeOperation='destination-over'
      ctxText.fillText('АВ', 80, 195)

      ctx.rect(0, 0, 314, 314)
      ctx.fillStyle = colorBkg
      
      ctx.fill()
      ctx.stroke()

      image.src = canvas.toDataURL("image/png")
      // image.crossOrigin = "anonymous"
      
      // const fileImage = new File([image], random()+'.png', {
      //   type: "image/png"
      // })
      // form.value.image = image
      form.value.user_name = image.src
      console.log(form.value.user_name)
    }



    onMounted(() => {
      
    })
    return {
      accept,
      form,
      isValidPass,
      policy,

      loading,

      passEye1,
      passEye2,

      onSubmit,
      onFileChange,

      figure,
      link,
      addColor,
      // generateImage,
      random
    }
  }
}
</script>