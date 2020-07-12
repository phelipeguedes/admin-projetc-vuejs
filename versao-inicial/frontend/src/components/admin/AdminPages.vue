<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main=" Administração do Sistema" subTitle="Cadastros e etc" />

        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Artigos" active>
                        <ArticleAdmin />
                    </b-tab>
                    <b-tab title="Categorias">
                        <CategorieAdmin />
                    </b-tab>
                    <b-tab title="Usuários">
                        <UserAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>            
        </div>
    </div>
</template>

<script>

import PageTitle from "../templates/PageTitle"
import ArticleAdmin from "./ArticleAdmin"
import CategorieAdmin from "./CategorieAdmin"
import UserAdmin from "./UserAdmin"

export default {
    name: 'AdminPages',
    components: { PageTitle, ArticleAdmin, UserAdmin, CategorieAdmin }
}
</script>