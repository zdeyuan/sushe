<template>
    <a-tabs class="auto-tabs">
        <a-tab-pane tab="健康测试" key="first">
            <healthTestBase viewType="base"></healthTestBase>
        </a-tab-pane>
        <a-tab-pane tab="体质管理" key="second">
            <healthTestDetail viewType="detail"></healthTestDetail>
        </a-tab-pane>
        <a-tab-pane tab="健康汇总" key="third">
            <healthSummary viewType="summary"></healthSummary>
        </a-tab-pane>
    </a-tabs>
</template>

<script>
    import healthTestBase from './veStuHealthScore/VeStuHealthScore';
    import healthTestDetail from './veStuHealthScore/VeStuHealthScore';
    import healthSummary from './veStuHealthScore/VeStuHealthScore';

    export default {
        components: {
            healthTestBase,
            healthTestDetail,
            healthSummary,
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
<style lang="less" scoped>
</style>
