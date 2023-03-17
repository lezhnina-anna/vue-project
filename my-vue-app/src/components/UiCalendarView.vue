<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="updateDate(-1)"
        ></button>
        <div class="calendar-view__date">{{ localDate }}</div>
        <button
          class="calendar-view__control-right"
          type="button"
          aria-label="Next month"
          @click="updateDate(1)"
        ></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div
        v-for="cell in dateCells"
        :key="cell.getTime()"
        :class="{
          'calendar-view__cell': true,
          'calendar-view__cell_inactive': cell.getMonth() !== currentDate.getMonth(),
        }"
        tabindex="0"
      >
        <div class="calendar-view__cell-day">{{ cell.getDate() }}</div>
        <div class="calendar-view__cell-content">
          <slot name="cell" :date="cell"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiCalendarView',

  data() {
    return {
      currentDate: new Date(),
    };
  },
  computed: {
    localDate: function () {
      return this.currentDate.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },
    dateCells: function () {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      const result = this.getInactiveCells(-1, date);

      while (date.getMonth() === this.currentDate.getMonth()) {
        result.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }

      window.dates = [...result, ...this.getInactiveCells(1, result[result.length - 1])];
      return [...result, ...this.getInactiveCells(1, result[result.length - 1])];
    },
  },

  methods: {
    getInactiveCells: function (dir, dateFrom) {
      const result = [];

      if (![1, -1].includes(dir)) return result;

      const sundayIndex = 7;
      let date = new Date(dateFrom);
      let currentWeekday = date.getDay() === 0 ? sundayIndex : date.getDay(); //восресенье

      const daysToAdd = dir === 1 ? sundayIndex - currentWeekday : currentWeekday - 1;

      for (let i = 0; i < daysToAdd; i++) {
        date.setDate(date.getDate() + dir);
        result.push(new Date(date));
      }

      return dir === 1 ? result : result.reverse();
    },
    updateDate: function (dir) {
      if (![1, -1].includes(dir)) return;

      this.currentDate.setDate(1);
      this.currentDate.setMonth(this.currentDate.getMonth() + dir);
      this.currentDate = new Date(this.currentDate);
    },
  },
};
</script>

<style scoped>
/* _calendar-view.css */
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('../assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}
</style>
