<template>
  <div class="top" :style="{ background: '#fff', padding: '8px 6px', height: height }">
    <FullCalendar ref="fullCalendar" :options="calendarOptions">
      <!-- 自定义事件显示内容 -->
      <template v-slot:eventContent="arg">
        <b>{{ arg.timeText }}</b>
        <i>{{ arg.event.title }}</i>
      </template>
    </FullCalendar>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default {
  name: 'CustomCalendar',
  components: {
    FullCalendar,
  },
  props: {
    height: {
      type: String,
      default: '100%',
    },
    events: {
      type: Array,
      default: () => [],
    },
    initialView: {
      type: String,
      default: 'timeGridWeek',
    },
    locale: {
      type: String,
      default: 'zh',
    },
    editable: {
      type: Boolean,
      default: false,
    },
    slotMinTime: {
      type: String,
      default: '07:00',
    },
    slotMaxTime: {
      type: String,
      default: '21:00',
    },
    slotDuration: {
      type: String,
      default: '00:30:00',
    },
    allDaySlot: {
      type: Boolean,
      default: false,
    },
    headerToolbar: {
      type: Object,
      default: () => ({
        start: 'prev,next today',
        center: 'title',
        end: 'timeGridWeek,dayGridMonth',
      }),
    },
    buttonText: {
      type: Object,
      default: () => ({
        today: '今天',
        month: '月',
        week: '周',
        day: '日',
        list: '周列表',
      }),
    },
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin],
        initialView: this.initialView,
        locale: this.locale,
        firstDay: 1,
        slotMinTime: this.slotMinTime,
        slotMaxTime: this.slotMaxTime,
        slotDuration: this.slotDuration,
        allDaySlot: this.allDaySlot,
        nowIndicator: true,
        navLinks: true,
        editable: this.editable,
        events: this.events,
        headerToolbar: this.headerToolbar,
        buttonText: this.buttonText,
        slotLabelFormat: {
          hour: 'numeric',
          minute: '2-digit',
          hour12: false,
        },
        eventTimeFormat: {
          hour: 'numeric',
          minute: '2-digit',
          hour12: false,
        },
        eventClick: this.handleEventClick,
        dateClick: this.handleDateClick,
        eventDragStart: this.eventDragStart,
        eventDragStop: this.eventDragStop,
        eventDrop: this.eventDrop,
        drop: this.drop,
        eventReceive: this.eventReceive,
        eventLeave: this.eventLeave,
        eventResizeStart: this.eventResizeStart,
        eventResizeStop: this.eventResizeStop,
        eventResize: this.eventResize,
      },
    };
  },
  methods: {
    handleEventClick(info) {
      this.$emit('eventClick', info);
    },
    handleDateClick(info) {
      this.$emit('dateClick', info);
    },
    eventDragStart(info) {
      this.$emit('eventDragStart', info);
    },
    eventDragStop(info) {
      this.$emit('eventDragStop', info);
    },
    eventDrop(info) {
      this.$emit('eventDrop', info);
    },
    drop(info) {
      this.$emit('drop', info);
    },
    eventReceive(info) {
      this.$emit('eventReceive', info);
    },
    eventLeave(info) {
      this.$emit('eventLeave', info);
    },
    eventResizeStart(info) {
      this.$emit('eventResizeStart', info);
    },
    eventResizeStop(info) {
      this.$emit('eventResizeStop', info);
    },
    eventResize(info) {
      this.$emit('eventResize', info);
    },
  },
};
</script>

<style scoped>
/deep/ .fc .fc-timegrid-slot {
  height: 2em;
}
</style>