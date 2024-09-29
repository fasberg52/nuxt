<template>
  <section class="font-iranyekan">
    <div
      class="flex flex-row justify-evenly items-center bg-[#f6f7fc] h-[250px] bg-top-footer-section"
    >
      <div class="text-2xl font-bold">آمـــاده همکـــاری با ما هستید؟</div>
      <Button
        class="font-normal rounded-[100px] p-8 bg-transparent bg-gradient-to-r from-orange-600 to-orange-400 shadow-lg hover:from-orange-500 hover:to-orange-300"
        >شروع همکاری</Button
      >
    </div>
    <div class="bg-indigo-950 flex flex-row flex-wrap justify-around py-20">
      <div class="w-[25%]">
        <NuxtImg format="webp" width="134" height="24" src="/images/logo.png" />
        <p class="text-white mt-4 text-sm font-regular leading-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ipsa
          corrupti repellat vero aspernatur tenetur nisi, consequatur maiores
          veniam laboriosam inventore natus harum maxime eum pariatur libero
          sequi blanditiis nobis!
        </p>
      </div>
      <div>
        <h4 class="text-white font-bold text-lg">صفحات</h4>
        <ul class="mt-4">
          <li class="text-white text-sm font-regular mb-3">
            <a href="#">صفحه نخست</a>
          </li>
          <li class="text-white text-sm font-regular mb-3">
            <a href="#">خدمات بانی وب</a>
          </li>
          <li class="text-white text-sm font-regular mb-3">
            <a href="#">فرصت شغلی</a>
          </li>
          <li class="text-white text-sm font-regular mb-3">
            <a href="#">تماس با ما</a>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-bold text-lg">راه های ارتباطی</h4>
        <ul class="mt-4">
          <li class="text-white text-sm font-[200] mb-3 flex items-center">
            <span class="ml-2"><img src="/images/Group 294.svg" alt="" /></span>
            <a href="#">info@bunnyeb.ir</a>
          </li>
          <li class="text-white text-sm font-regular mb-3 flex items-center">
            <span class="ml-2"><img src="/images/Calling.svg" alt="" /></span>
            <a href="#">0905-235-3363</a>
          </li>
          <li class="text-white text-sm font-regular mb-3 flex items-center">
            <span class="ml-2"><img src="/images/Calling.svg" alt="" /></span>
            <a href="#">0921-891-3541</a>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-bold text-lg">شبکه های اجتماعی</h4>
        <ul class="mt-4">
          <li class="text-white text-sm font-regular mb-3 flex items-center">
            <span class="ml-2"><img src="/images/Group-297.svg" alt="" /></span>
            <a href="#">لینکدین</a>
          </li>
          <li class="text-white text-sm font-regular mb-3 flex items-center">
            <span class="ml-2"><img src="/images/Group-298.svg" alt="" /></span>
            <a href="#">اینستاگرام</a>
          </li>
          <li class="text-white text-sm font-regular mb-3 flex items-center">
            <span class="ml-2"><img src="/images/vector.svg" alt="" /></span>
            <a href="#">تلگرام</a>
          </li>
          <li class="text-white text-sm font-regular mb-3 flex items-center">
            <span class="ml-2"><img src="/images/Group-298.svg" alt="" /></span>
            <a href="#">واتس اپ</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style>
.bg-top-footer-section {
  background-image: url('~/public/images/Group-290.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  color: white;
}
</style>
