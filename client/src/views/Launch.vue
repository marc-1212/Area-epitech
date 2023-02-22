<template>
  <div class="min-h-screen bg-gray-700 py-6 flex flex-col justify-center sm:py-12">
  <section
    class="flex flex-col lg:flex-row items-center justify-center my-20 gap-12"
    :class="'reverse' && 'flex-col-reverse lg:flex-row-reverse'"
  >
        <div class="text-center lg:flex-row md:text-white grid gap-6 text-white ">
           <div class="text-center md:text-white grid gap-6 ">
            <div class="">
              <div class="sm:text-7xl text-5xl font-bold py-2">Everything works</div>
              <div class="sm:text-7xl text-5xl font-bold py-2">better together</div>
              <div class="text-white sm:text-2xl text-3xl font-bold py-8">Quickly and easily automate your favorite apps and devices.</div>
            </div>
           <div class="py-10">
            <router-link tag="button" class="inline-block px-10 py-5 bg-gradient-to-r from-indigo-800 via-purple-900 to-indigo-900 text-white font-medium text-sm leading-snug uppercase text-center rounded-2xl shadow-md hover:bg-purple-500 hover:shadow-lg focus:bg-purple-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-500 active:shadow-lg transition duration-150 ease-in-out" to="/signup">Sign up</router-link>
            <a class="text-white px-5 font-semibold hover:underline" href="#info">Learn more</a>      
           </div>        
          </div>
        </div>
      </section>
      <section class="bg-white dark:bg-gray-900" id="info">
    <div class="container px-6 py-10 mx-auto">
        <div class="lg:-mx-6 lg:flex lg:items-center">
            <img class="object-cover object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[36rem]" src="../assets/launch/launch_image2.png" alt="">
            <div class="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
                <h1 class="text-5xl text-center font-bold text-gray-600 text-shadow-xl">
                    Make your automation more powerful
                </h1>

                <p class="mt-6 lg:justify-center text-gray-700 dark:text-gray-700 text-2xl text-center">
                  Customize and control your integrations with filter code,
                  queries, multiple actions, and the ability to connect multiple accounts per service.
                </p>
               <div class="flex items-center justify-center mt-12 lg:justify-center">
                 <a href="/plans" class="
                  px-10 py-5 bg-gradient-to-r from-indigo-800 via-purple-900 to-indigo-900 text-white font-medium text-sm leading-snug uppercase text-center rounded-2xl shadow-md hover:bg-purple-500 hover:shadow-lg focus:bg-purple-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-500 active:shadow-lg transition duration-150 ease-in-out">See plans</a>
                </div>
            </div>
        </div>
    </div>
  </section>
  <section
    class="flex flex-col lg:flex-row items-center justify-center my-20 gap-12"
    :class="'reverse' && 'flex-col-reverse lg:flex-row-reverse'"
  >
    <div>
      <div class="text-3xl text-white font-semibold text-center py-6">The leading no-code platform on mobile</div>
      <div class="text-2xl text-white text-center py-6">Automate from anywhere, anytime. Our iOS and Android apps make it simple.</div>
        <div class="flex items-center justify-center">
          <div class="flex items-center md:justify-between py-6">
            <img class="w-40 object-cover md:w-64 px-2" src="../assets/launch/downloadApple.png" href="#">
            <img class="w-48 object-cover md:w-80 px-2" src="../assets/launch/downloadGoogle.png" href="#">
          </div>
        </div>
      <div class="text-3xl font-bold text-white text-center py-10">The power of connection</div>
      <div class="text-2xl font-semibold text-white text-center">Not every thing on the internet plays nice,</div>
      <div class="text-2xl font-semibold text-white text-center">we're here to fix that.</div>
    </div>
  </section>
  </div>
</template>

<style>
  html {
    scroll-behavior: smooth;
  }

</style>