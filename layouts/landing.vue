<template>
  <VApp class="font-mono">
    <VAppBar flat app color="transparent">
      <VSpacer />
      <VRow justify="space-between">
        <VBtn nuxt to="/" variant="flat" color="deep-purple">
          Quem Somos
        </VBtn>
        <VBtn nuxt to="/equipe" variant="flat" color="deep-purple">
          Equipe
        </VBtn>
        <VBtn nuxt to="/aplicacoes" variant="flat" color="deep-purple">
          Aplicações
        </VBtn>
        <VBtn nuxt to="/bot" variant="flat" color="deep-purple">
          BOT
        </VBtn>
      </VRow>
      <VSpacer />
    </VAppBar>
    <VMain class="bg-violet-300">
      <VContainer class="fill-height">
        <VRow class="fill-height" justify="center">
          <VCol cols="6" class="fill-height">
            <VCard elevation="10" class="h-100" color="deep-purple">
              <VCardTitle class="ma-4 text-center">
                <h1 class="text-6xl">
                  <slot name="header" />
                </h1>
              </VCardTitle>
              <VCardText>
                <slot />
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </VMain>
    <VFooter app class="justify-center" color="transparent">
      <VCol cols="6">
        <VRow justify="space-between">
          <VCol class="text-center">
            <span>X</span>
          </VCol>
          <VCol class="text-center">
            <span>Insta</span>
          </VCol>
          <VCol class="text-center">
            <span>Discord</span>
          </VCol>
        </VRow>
      </VCol>
    </VFooter>
  </VApp>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>
