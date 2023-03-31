<template>
  <div class="main-container">
    <div class="heading">
      <h1 class="heading__title">
        Bem-vindo ao início de uma nova era com o <span class="gradient__text">Anlonio Games</span>!
      </h1>
      <p class="heading__credits">
        Em breve mais informações.
        Me siga no <a href="https://twitter.com/oanlonio" target="_blank">twitter</a> para se manter atualizado.
      </p>
    </div>
    <div class="cards">
      <div class="card prisma__card">
        <div class="card__body">
          <h2 class="card__title">
            Jogue com o chat
          </h2>
          <p>
            Interaja com seu chat enquanto joga. Anlonio Games irá proporcionar uma experiência única para você e seus viewers.
          </p>
        </div>
        <p class="card__action">
          <a class="card__link" href="https://twitter.com/oanlonio" target="_blank">
            Em breve
          </a>
        </p>
      </div>
      <div class="card auth__card">
        <div class="card__body">
          <h2 class="card__title">
            Comandos insanos e úteis
          </h2>
          <p>
            Disponibilize informação e diversão com os comandos do Anlonio Games.
          </p>
        </div>
        <p class="card__action">
          <a class="card__link" href="https://twitter.com/oanlonio" target="_blank">
            Em breve
          </a>
        </p>
      </div>
      <div class="card trpc__card">
        <div class="card__body">
          <h2 class="card__title">
            Overlays turbinadas
          </h2>
          <p>
            Use overlays incríveis para suas lives.
          </p>
        </div>
        <p class="card__action">
          <a class="card__link" href="https://twitter.com/oanlonio" target="_blank">
            Em breve
          </a>
        </p>
      </div>
      <div class="card tailwind__card">
        <div class="card__body">
          <h2 class="card__title">
            Também me siga na Twitch
          </h2>
          <p>
            Além de programador, também sou streamer. Me siga na Twitch para acompanhar minhas lives.
          </p>
        </div>
        <p class="card__action">
          <a class="card__link" href="https://twitch.tv/oanlonio" target="_blank">
            twitch.tv/oanlonio
          </a>
        </p>
      </div>
    </div>
    <div class="social_buttons">
      <a target="_blank" href="https://www.paypal.com/donate/?business=875MJNLF8SEXY&no_recurring=1&item_name=Me+pague+um+caf%C3%A9&currency_code=BRL">
        <span>
          Me pague um café ☕
          <img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" alt="Donate">
        </span>
      </a>
      <div class="float-right">
        <a href="mailto:contato@anlonio.games" target="_blank">
          <img src="https://img.shields.io/badge/contato%40anlonio.games-Contact%20me-blue" alt="Contact me">
        </a>
        <a href="https://twitter.com/oanlonio" target="_blank" class="pl-3">
          <img src="https://img.shields.io/twitter/follow/oanlonio?style=social" alt="Twitter Follow">
        </a>
      </div>
    </div>
  </div>
</template>

<script setup land="ts">
definePageMeta({
  auth: false
})
</script>

<style scoped lang="scss">
  .social_buttons {
    margin-top: 30px;

    img {
      display: inline-block;
    }
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background-color: #eefbfc;
    color: #484848;
  }

  .main-container {
    max-width: 45vw;
    margin: auto;
    padding-top: 60px;
  }

  /* HEADING */

  .heading {
    text-align: center;
  }

  .heading__title {
    font-weight: 600;
    font-size: 40px;
  }

  .gradient__text {
    background: linear-gradient(to right, #a07ccf 10%, #6a4b9a 40%, #7b4fba 60%, #a07ccf 90%);
    background-size: 200% auto;
    color: #000;
    background-clip: text;
    text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 1s linear infinite;
  }

  @keyframes shine {
    to {
        background-position: 200% center;
    }
  }

  .heading__credits {
    color: #888888;
    font-size: 25px;
    transition: all 0.5s;
  }

  .heading__credits a {
    text-decoration: underline;
  }

  /* CARDS */
  .cards {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 30px;
  }

  .card {
    padding: 20px;
    width: 100%;
    min-height: 200px;
    display: grid;
    grid-template-rows: 20px 50px 1fr 50px;
    border-radius: 10px;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
    transition: all 0.2s;
    cursor: default;
  }

  .card:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
    transform: scale(1.01);
  }

  .card__link {
    position: relative;
    text-decoration: underline;
    color: rgba(255, 255, 255, 0.9);
  }

  .card__title {
    font-weight: 400;
    color: #ffffff;
    font-size: 30px;
  }

  .card__body {
    grid-row: 2/4;
  }

  .card__body p {
    color: #ffffff;
  }

  .card__action {
    grid-row: 5/6;
    align-self: center;
    display: flex;
    gap: 20px
  }

  /* RESPONSIVE */

  @media (max-width: 1600px) {
    .main-container {
        max-width: 100vw;
        padding: 50px;
    }

    .cards {
        justify-content: center;
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }

    .prisma__card { background: radial-gradient(#3fbafe, #5A67D8FF); }
    .auth__card { background: radial-gradient(#0FCF97, #0B9A71); }
    .trpc__card { background: radial-gradient(#a07ccf, #926dc2); }
    .tailwind__card { background: radial-gradient(#7466e3, #5a4ad9); }
</style>
