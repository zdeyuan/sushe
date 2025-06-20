<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-27 21:11:30
-->
<template>
    <a-tabs class="auto-tabs">
        <a-tab-pane tab="考勤统计" key="first">
            <edu-layout type="table" :extHeight="50" topName="考勤统计">
                <stuAttendList slot="table"></stuAttendList>
            </edu-layout>
        </a-tab-pane>
        <a-tab-pane tab="考勤登记" key="third">
            <veStuAttendAdd viewType="register"></veStuAttendAdd>
        </a-tab-pane>
    </a-tabs>
</template>

<script>
    import stuAttendList from './stuAttend/veStuAttendList';
    import veStuAttendAdd from './stuAttend/veStuAttendAdd';
    export default {
        components: {
            stuAttendList,
            veStuAttendAdd
        },
        data() {
            return {
                activeName: 'first'
            };
        },
        mounted() {},
        methods: {}
    };
</script>
