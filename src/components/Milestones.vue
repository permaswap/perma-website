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
      class="px-6 mx-auto xl:w-1024px 2xl:w-1342px"
    >
      <div style="color: #70B16E;margin-bottom:38px;" class="text-36px font-bold">
        {{ t('milestone') }}
      </div>
      <!-- PC 端 -->
      <div class="hidden md:block">
        <div
          v-for="(milestones, index) in milestonesArr"
          :key="index"
          class="flex flex-row items-center justify-between"
        >
          <div
            v-for="milestone in milestones"
            :key="milestone.title"
            class="pt-7 pb-16 pl-10 mb-5 w-48% h-250px 2xl:h-310px"
            :style="`
              background: #171717;border-radius: 23.4984px;box-sizing:border-box;
            `"
          >
            <div class="text-sm" style="color: #8A8B8A;font-weight: 500;">
              {{ milestone.title.toUpperCase() }}
            </div>
            <div class="flex flex-row items-center justify-start mt-5 md:mt-10">
              <img :src="require(`@/images/${milestone.iconSrc}`)" class="mr-5 xl:mr-10 w-20 h-20 xl:w-100px xl:h-100px 2xl:w-155px 2xl:h-155px">
              <ul>
                <li
                  v-for="(item, indexItem) in milestone.items"
                  :key="indexItem"
                  class="flex flex-row items-start justify-start mb-1"
                  style="font-weight: 300;font-size: 16.4195px;color: #B8B8B8;line-height: 140%;"
                >
                  <div
                    style="width: 7.66px;height: 7.66px;border: 1.09464px solid #555555;border-radius:100%;"
                    class="mr-2.5 relative top-2" />
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
                  class="flex flex-row items-start justify-start mb-1"
                  style="font-weight: 300;font-size: 13px;color: #B8B8B8;line-height: 140%;"
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
    background-position: 50px 0;
  }
}
@media (min-width: 1024px) {
  .milestone-container {
    background-position: 100px 0;
  }
}
@media (min-width: 1280px) {
  .milestone-container {
    background-position: 500px 0;
  }
}
</style>

<style>
.swiper-pagination-bullet-active {
  background: #fff !important;
}
</style>
