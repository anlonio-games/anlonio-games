<template>
  <VApp>
    <VAppBar color="primary">
      <VToolbarItems>
        <VBtn icon nuxt href="/">
          <VIcon>mdi-home</VIcon>
        </VBtn>
      </VToolbarItems>
      <VToolbarTitle>Anlonio Games</VToolbarTitle>
    </VAppBar>
    <VMain>
      <VContainer>
        <VRow justify="center">
          <VCol lg="10" xl="6">
            <VRow>
              <VCol>
                <VCard color="primary">
                  <VCardItem>
                    <VCardTitle class="text-h4">
                      Como Usar
                    </VCardTitle>
                  </VCardItem>
                  <VCardText>
                    <p class="text-h5">
                      Para começar a usar os comandos da API, você só precisar fazer 3 passos: <br>
                      - Verificar e excluir/editar caso exista algum comando já existente no seu StreamElements <br>
                      - Adicionar o comando base com o link da API <br>
                      - Adicionar os alias (comandos alternativos ao do link) de cada comando <br><br>
                      E pronto! Agora você já pode usar os comandos. Caso queria remover algum comando, basta remover o alias.
                    </p>
                  </VCardText>
                </VCard>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <VCard>
                  <v-tooltip
                    v-model="copied"
                    :activator="copiedCommand ?? undefined"
                    location="top"
                    close-delay="1000"
                  >
                    Copiado!
                  </v-tooltip>
                  <VCardTitle>
                    <h1 class="text-h4">
                      Comandos
                    </h1>
                  </VCardTitle>
                  <VCardText>
                    <VList item-props :items="commands" lines="two">
                      <template #prepend="{ item }">
                        <VBtn :ref="item.id" icon variant="flat">
                          <VIcon>
                            {{ item.props.prependIcon }}
                          </VIcon>
                        </VBtn>
                      </template>
                      <template #subtitle="{ subtitle }">
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <div v-html="subtitle" />
                      </template>
                    </VList>
                  </VCardText>
                </VCard>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VContainer>
    </VMain>
    <VFooter app color="primary">
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
                <span class="pl-3">
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

<script setup lang="ts">
type Commands = { id: string; title: string; onClick: () => void, subtitle: string; props: { prependIcon: string }}[];
definePageMeta({
  alias: '/comandos'
})

const source = ref('')

const { copy, copied, isSupported } = useClipboard({ source, legacy: true })

function copyCommand (command: string) {
  source.value = command
  if (isSupported.value) {
    copy(command)
  } else {
    alert('Seu navegador não suporta essa funcionalidade')
  }
}

const tft = ref(null)
const alias = ref(null)

const copiedCommand = ref(null)

const commands: Commands = [
  {
    id: 'tft',
    title: 'Comando Base !tft',
    onClick: () => {
      // eslint-disable-next-line no-template-curly-in-string
      copyCommand('!cmd add tft ${urlfetch https://api.anlonio.games/api/twtv/tft/${0}?channel=${channel}&search=${queryescape ${1: | help}}&id=${getcount portal}}')
      copiedCommand.value = tft.value
    },
    // eslint-disable-next-line no-template-curly-in-string
    subtitle: '!cmd add tft ${urlfetch https://api.anlonio.games/api/twtv/tft/${0}?channel=${channel}&search=${queryescape ${1: | help}}&id=${getcount portal}}',
    props: {
      prependIcon: 'mdi-content-copy'
    }
  },
  {
    id: 'alias',
    title: 'Adicionar todos os Alias',
    onClick: () => {
      copyCommand('!cmd alias add tft passe stats stats+ proximo p d levelup novonivel lu dados portal')
      copiedCommand.value = alias.value
    },
    subtitle: '!cmd alias add tft passe stats stats+ proximo p d levelup novonivel lu dados portal',
    props: {
      prependIcon: 'mdi-content-copy'
    }
  },
  {
    id: 'setportal',
    title: 'Comando de definir o portal da partida',
    onClick: () => {
      // eslint-disable-next-line no-template-curly-in-string
      copyCommand('!cmd add setportal /me Portal Alterado para ${1:} ${count portal ${urlfetch https://api.anlonio.games/api/twtv/tft/portal/slug2number?channel=${channel}&search=${queryescape ${1:}}}}')
      copiedCommand.value = alias.value
    },
    // eslint-disable-next-line no-template-curly-in-string
    subtitle: '!cmd add setportal /me Portal Alterado para ${1:} ${count portal ${urlfetch https://api.anlonio.games/api/twtv/tft/portal/slug2number?channel=${channel}&search=${queryescape ${1:}}}}',
    props: {
      prependIcon: 'mdi-content-copy'
    }
  },
  {
    id: 'portalAlias',
    title: 'Comando para permitir apenas pessoas moderadoras do canal usarem o comando',
    onClick: () => {
      copyCommand('!cmd options setportal -level 500')
      copiedCommand.value = alias.value
    },
    subtitle: '!cmd options setportal -level 500',
    props: {
      prependIcon: 'mdi-content-copy'
    }
  }
]
</script>

<style scoped>

</style>
