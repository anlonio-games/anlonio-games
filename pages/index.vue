<template>
  <VApp>
    <VNavigationDrawer
      v-model:model-value="drawer"
      temporary
      :color="activeSectionColor"
    >
      <VList dense>
        <VListItem
          v-for="section of sections"
          :key="section.id"
          link
          @click="scrollToTag(section.id) || (drawer = false)"
        >
          <VListItemTitle>
            {{ section.nav }}
          </VListItemTitle>
        </VListItem>
      </VList>
    </VNavigationDrawer>
    <VAppBar fixed flat :color="activeSectionColor">
      <VAppBarNavIcon v-if="$vuetify.display.mobile" @click="drawer = !drawer" />
      <VAppBarTitle
        :class="{ 'pl-5': !$vuetify.display.mobile }"
        class="text-lg-h5"
      >
        Anlonio Games
      </VAppBarTitle>
      <VToolbarItems v-if="!$vuetify.display.mobile">
        <VBtn v-for="section of sections" :key="section.id" @click.prevent="scrollToTag(section.id)">
          {{ section.nav }}
        </VBtn>
        <VBtn
          size="small"
          href="https://twitter.com/oanlonio"
          target="_blank"
        >
          <v-icon size="x-large">
            mdi-twitter
          </v-icon>
        </VBtn>
        <VBtn size="small" href="https://twitch.tv/oanlonio" target="_blank">
          <v-icon size="x-large">
            mdi-twitch
          </v-icon>
        </VBtn>
      </VToolbarItems>
    </VAppBar>
    <VMain>
      <VContainer fluid class="pa-0 ma-0">
        <VRow
          v-for="section of sections"
          :id="section.id"
          :key="section.id"
          :ref="section.ref"
          tag="section"
          class="h-screen"
        >
          <VCol class="pa-0">
            <VSheet v-element-visibility="(v)=>section.active=v" :color="section.color" class="h-full py-4 px-10">
              <VRow justify="center" align="center" class="fill-height">
                <VCol :order="section.offset" lg="6" class="text-center">
                  <span>
                    <!-- eslint-disable-next-line vue/html-self-closing, vue/no-v-html -->
                    <h1 class="text-xl-h1 text-lg-h2 text-h4" v-html="section.title" />
                    <template v-if="$vuetify.display.mobile">
                      <br>
                      <br>
                      <!-- eslint-disable-next-line vue/html-self-closing, vue/no-v-html -->
                      <p class="text-lg-h4" v-html="section.body" />
                      <br>
                      <br>
                      <VBtn
                        v-if="section.link"
                        variant="outlined"
                        size="small"
                        nuxt
                        :href="section.link"
                      >
                        {{ section.linkText }}
                      </VBtn>
                    </template>
                  </span>
                </VCol>
                <VCol v-if="!$vuetify.display.mobile" lg="6" class="text-center">
                  <!-- eslint-disable-next-line vue/html-self-closing, vue/no-v-html -->
                  <p class="text-xl-h4 text-lg-h5" v-html="section.body" />
                  <br>
                  <br>
                  <VBtn
                    v-if="section.link"
                    size="large"
                    variant="outlined"
                    nuxt
                    :href="section.link"
                    class="text-lg-h4"
                  >
                    {{ section.linkText }}
                  </VBtn>
                </VCol>
              </VRow>
            </VSheet>
          </VCol>
        </VRow>
      </VContainer>
    </VMain>
    <VFooter app :color="activeSectionColorInverse">
      <VContainer class="pa-0" fluid>
        <VRow justify="center" align="center" wrap>
          <VCol cols="12" lg="4" class="text-center">
            <span>
              Made with ❤️ by
              <a href="https://twitter.com/oanlonio" target="_blank">Anlonio</a>
            </span>
          </VCol>
          <VCol cols="12" lg="8" class="text-center">
            <span>
              <span>
                <VBtn variant="text" target="_blank" href="https://www.paypal.com/donate/?business=875MJNLF8SEXY&no_recurring=1&item_name=Me+pague+um+caf%C3%A9&currency_code=BRL">
                  <span class="pr-2">
                    Me pague um café ☕
                  </span>
                  <span>
                    <img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" alt="Donate">
                  </span>
                </VBtn>
                <br v-if="$vuetify.display.mobile">
                <span class="pl-lg-3">
                  (Se preferir pix: contato@anlonio.games)
                </span>
              </span>
            </span>
          </VCol>
        </VRow>
      </vcontainer>
    </VFooter>
  </VApp>
</template>

<script setup>
import { vElementVisibility } from '@vueuse/components'

function scrollToTag (tag) {
  const element = document.getElementById(tag)
  const posicao = element.offsetTop - 64
  scrollTo(0, posicao)
}

const drawer = ref(false)

const sections = ref({
  main: {
    id: 'main',
    ref: 'main',
    color: 'deep-purple-lighten-1',
    active: false,
    nav: 'Início',
    title: 'Bem-vindo ao <br> Anlonio <span class="italic text-lg-h6 text-caption">ponto</span> Games!',
    body: `
    Aqui você encontra tudo que precisa para ter uma experiência incrível
    enquanto assiste ou faz stream de jogos.
    `,
    link: '/comandos',
    linkText: 'Clique aqui e comece pelos comandos'
  },
  commands: {
    id: 'commands',
    ref: 'commands',
    color: 'indigo-lighten-1',
    active: false,
    nav: 'Comandos',
    title: 'Comandos insanos e úteis',
    offset: 1,
    link: '/comandos',
    body: `
    Aqui você encontra todos os comandos disponíveis para você usar em sua
    stream ou recomendar pro seu streamer favorito. São comandos incríveis e úteis para você interagir com seus
    espectadores e mantê-los sempre informados.
    `,
    linkText: 'Clique aqui e comece pelos comandos'
  },
  games: {
    id: 'games',
    ref: 'games',
    color: 'blue-lighten-1',
    active: false,
    nav: 'Jogos',
    title: 'Jogos Serelepes e Mal Feitos',
    body: `
    Em breve você poderá encontrar aqui uma lista de jogos serelepes e mal feitos
    para você jogar e interagir com seus espectadores.
    `
  },
  overlays: {
    id: 'overlays',
    ref: 'overlays',
    color: 'light-blue-lighten-1',
    active: false,
    nav: 'Overlays',
    title: 'Overlays úteis e bacanudos',
    offset: 1,
    body: `
    Talvez em breve você poderá encontrar aqui os overlays mais úteis e bacanudos
    para você usar em sua stream ou recomendar para seu Streamer favorito.
    `
  },
  about: {
    id: 'about',
    ref: 'about',
    color: 'cyan-lighten-1',
    active: false,
    nav: 'Sobre',
    title: 'Sobre',
    body: `
    Esse projeto foi criado com o intuito de ajudar a comunidade de streamers e
    espectadores a terem uma melhor e mais completa experiência.
    <br>
    <br>
    Criado por mim, Anlonio, um programador e jogador que decidiu ajudar a comunidade,
    utilizando de meus conhecimentos e experiências para criar ferramentas que
    possam ajudar a todos.
    `
  }
})

const activeSectionColor = computed(() => {
  const activeSection = Object.values(sections.value).find(
    section => section.active
  )
  return activeSection?.color
})

const activeSectionColorInverse = computed(() => {
  const activeSection = Object.values(sections.value).findLast(
    section => section.active
  )
  return activeSection?.color
})
</script>
