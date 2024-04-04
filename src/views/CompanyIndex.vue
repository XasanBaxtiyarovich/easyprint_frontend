<template>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <company-layout-menu/>
            <div v-if="MobileMenu">
                <company-layout-menu-mobile :closeSideBar="closeSideBar"></company-layout-menu-mobile>
            </div>
            <div class="layout-page">
                <header-main :showSideBar="showSideBar"/>
                <div class="container-xxl flex-grow-1 container-p-y mt-5">
                    <div class="row">
                        <div class="col-12">
                            <canvas id="myBar"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import {mapGetters, mapMutations} from 'vuex';

export default {
    computed: {
        ...mapGetters(['MobileMenu'])
    },

    methods: {
        chartBar () {
            const bar = document.getElementById('myBar');

            const data = {
            labels: "month",
                datasets: [{
                    label: 'My First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            }

            const config = new Chart(bar, {
                type: 'bar',
                data: data,
                options: {
                    scales: {
                    y: {
                        beginAtZero: true
                    }
                    }
                },
            });
        },

        ...mapMutations(['showSideBar', 'closeSideBar'])
    },
    mounted() {
        this.chartBar();
    }
}
</script>