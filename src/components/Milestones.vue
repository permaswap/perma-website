<script lang="ts" setup>
import { Pagination } from 'swiper'
import { Swiper } from 'swiper/vue/swiper'
import { SwiperSlide } from 'swiper/vue/swiper-slide'
import 'swiper/swiper.scss'
import 'swiper/swiper-bundle.css'
import { useI18n } from 'vue-i18n'
interface MilestonesArr {
  title: string
  iconSrc: string
  items: string[]
}
const { t } = useI18n()
const milestonesArr:MilestonesArr[][] = [
  [
    {
      title: 'precursor',
      iconSrc: 'precursor.png',
      items: [
        'milestone_1_1',
        'milestone_1_2',
        'milestone_1_3',
        'milestone_1_4'
      ]
    },
    {
      title: 'forerunner',
      iconSrc: 'forerunner.png',
      items: [
        'milestone_2_1',
        'milestone_2_2',
        'milestone_2_3',
        'milestone_2_4'
      ]
    }
  ],
  [
    {
      title: 'prophet',
      iconSrc: 'prophet.png',
      items: [
        'milestone_3_1',
        'milestone_3_2',
        'milestone_3_3',
        'milestone_3_4'
      ]
    },
    {
      title: 'flood',
      iconSrc: 'flood.png',
      items: [
        'milestone_4_1',
        'milestone_4_2',
        'milestone_4_3',
        'milestone_4_4'
      ]
    }
  ]
]
const milestoneArr = [
  ...milestonesArr[0],
  ...milestonesArr[1]
]
</script>

<template>
  <div class="pb-20 milestone-container milestone-Bg bg-no-repeat" style="">
    <div
      class="px-6 mx-auto xl:w-1024px 2xl:w-1200px"
    >
      <div class="text-36px mb-9 font-space-gtotesk-bold text-permaGreen2">
        {{ t('milestone') }}
      </div>
      <!-- PC 端 -->
      <div class="hidden md:block pt-9">
        <div
          v-for="(milestones, index) in milestonesArr"
          :key="index"
          class="flex flex-row items-center justify-between"
        >
          <div
            v-for="milestone in milestones"
            :key="milestone.title"
            class="pt-7 pb-16 pl-7 mb-5 w-49% 2xl:h-310px h-300px rounded-3xl"
            :style="`
              background: #171717;;box-sizing:border-box;
            `"
          >
            <div class="text-sm sm:text-base font-space-gtotesk-medium" style="color: #8A8B8A;">
              {{ milestone.title.toUpperCase() }}
            </div>
            <div class="flex flex-row items-center justify-start mt-5 md:mt-8">
              <img :src="require(`@/images/${milestone.iconSrc}`)" class="mr-5 xl:mr-10 w-20 h-20 xl:w-100px xl:h-100px 2xl:w-40 2xl:h-40">
              <ul>
                <li
                  v-for="(item, indexItem) in milestone.items"
                  :key="indexItem"
                  class="flex flex-row items-start text-permaGray3 justify-start mb-1 font-space-gtotesk-light text-14px"
                >
                  <div
                    style="border: 1.09464px solid #555555;"
                    class="mr-2.5 relative top-1.5 w-1.5 h-1.5 rounded-full" />
                  <div>{{ t(item) }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 移动端用 swiper -->
      <div class="md:hidden">
        <swiper :pagination="true" :modules="[Pagination]" class="mySwiper">
          <swiper-slide v-for="(milestone, index) in milestoneArr" :key="index">
            <div style="width: 264.98px;margin:0 auto 50px;background: #171717;border-radius: 28px;">
              <div class="text-base pt-7 pl-4" style="color: #8A8B8A;font-weight: 500;">
                {{ milestone.title.toUpperCase() }}
              </div>
              <img :src="require(`@/images/${milestone.iconSrc}`)" style="width:133px;height:133px;margin: 36px auto;">
              <ul class="pb-10">
                <li
                  v-for="(item, indexItem) in milestone.items"
                  :key="indexItem"
                  class="flex flex-row items-start justify-start mb-1 font-space-gtotesk-light text-permaGray3"
                  style="font-size: 13px;line-height: 140%;"
                >
                  <div
                    style="width: 4.64px;height: 4.64px;border:1.09464px solid #555555;border-radius:100%; top:7px;"
                    class="ml-4 mr-2.5 relative" />
                  <div>{{ t(item) }}</div>
                </li>
              </ul>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<style scoped>
.milestone-Bg{
  background-image: url('../images/milestone-back.png');
}
.milestone-container {
  background-position: 0 0;
}
@media (min-width: 768px) {
  .milestone-container {
    background-position: 54% 0;
  }
}

</style>

<style>
.swiper-pagination-bullet-active {
  background: #fff !important;
}
</style>
