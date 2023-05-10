<template>
  <VApp>
    <slot name="AppBar">
      <VAppBar color="primary">
        <VToolbarItems>
          <VBtn icon nuxt to="/">
            <VIcon>mdi-home</VIcon>
          </VBtn>
        </VToolbarItems>
        <VToolbarTitle>Anlonio Games</VToolbarTitle>
      </VAppBar>
    </slot>
    <VMain>
      <slot />
    </VMain>
    <slot name="Footer">
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
    </slot>
  </VApp>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
