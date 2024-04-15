<template>
    <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme" style="box-shadow: 4px 4px 20px rgb(0, 0, 0, 0.2);">
        <CSidebar>
            <CSidebarHeader class="border-bottom">
                <CSidebarBrand>
                    <router-link style="color: black; font-size: 20px; font-weight: 400;" to="/company">Easy print</router-link>
                </CSidebarBrand>
                <a style="text-align: end;" @click="closeSideBar">
                    <i class="fa fa-angle-left"></i>
                </a>
            </CSidebarHeader>

            <CSidebarNav>
                <CNavItem href="/company/user/index" @click="closeSideBar">
                    <i class="fa fa-users me-3"></i> {{ $t('bar.users') }}
                </CNavItem>
                <CNavItem href="/warehouse/products" @click="closeSideBar">
                    <i class="fa-solid fa-warehouse me-3"></i> {{ $t('bar.warehouse') }}
                </CNavItem>
            </CSidebarNav>
        </CSidebar>
    </aside>
</template>

<script>
import { CSidebar, CSidebarHeader, CSidebarNav, CSidebarBrand, CNavItem } from '@coreui/vue';

export default {
    name: 'company-mobile-layout-menu',

    components: {
        CSidebar,
        CNavItem,
        CSidebarNav,
        CSidebarBrand,
        CSidebarHeader
    },

    props: {
        closeSideBar: {
            type: Function
        }
    },
}
</script>

<style>
.position-fx {
    position: fixed;
}

.sidebar:not(.sidebar-end):not(.show) {
    margin-left: 0px !important;
}
</style>