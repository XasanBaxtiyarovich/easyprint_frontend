<template>
    <aside id="layout-menu" class="layout-menu layout-menu-main  menu-vertical menu bg-menu-theme">
        <CSidebar>
            <CSidebarHeader class="border-bottom">
                <CSidebarBrand>
                    <router-link style="color: black; font-size: 20px; font-weight: 400;" to="/company">Easy print</router-link>
                </CSidebarBrand>
            </CSidebarHeader>

            <CSidebarNav>
                <CNavItem href="/company/user/index">
                    <i class="fa fa-users me-3"></i> {{ $t('bar.users') }}
                </CNavItem>
                <CNavItem href="/warehouse/products">
                    <i class="fa-solid fa-warehouse me-3"></i> {{ $t('bar.warehouse') }}
                </CNavItem>
            </CSidebarNav>
        </CSidebar>
    </aside>
</template>

<script>
import { CSidebar, CSidebarHeader, CSidebarNav, CSidebarBrand, CNavItem } from '@coreui/vue';

export default {
    name: 'company-layout-menu',

    components: {
        CSidebar,
        CNavItem,
        CSidebarNav,
        CSidebarBrand,
        CSidebarHeader
    },
}
</script>

<style>
.position-fx {
    position: fixed;
}

@media screen and (max-width: 1200px) {
    .layout-menu-main {
        display: none !important;
    }
}
</style>