(window.webpackJsonp=window.webpackJsonp||[]).push([[699],{"XCl+":function(e,n,t){"use strict";t.r(n),t.d(n,"_frontmatter",(function(){return o})),t.d(n,"default",(function(){return l}));t("1c7q"),t("abGl"),t("gZHo"),t("Fdmb"),t("Ir+3"),t("2mQt"),t("mXGw");var a=t("/FXl"),r=t("TjRS");t("aD51");function s(){return(s=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}var o={};void 0!==o&&o&&o===Object(o)&&Object.isExtensible(o)&&!o.hasOwnProperty("__filemeta")&&Object.defineProperty(o,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"manual/WordPress/WP-PC-Cheat-Sheet.md"}});var i={_frontmatter:o},p=r.a;function l(e){var n=e.components,t=function(e,n){if(null==e)return{};var t,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)t=s[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,["components"]);return Object(a.b)(p,s({},i,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"wp-pres-company-cheat-sheet"},"WP PRES COMPANY CHEAT SHEET"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",s({parentName:"li"},{href:"#wp-pres-company-cheat-sheet"}),"WP PRES COMPANY CHEAT SHEET"),Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",s({parentName:"li"},{href:"#wppres-1-faq"}),"WPPRES-1: FAQ")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",s({parentName:"li"},{href:"#wppres-2-custom-type-relationships"}),"WPPRES-2: Custom Type Relationships")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",s({parentName:"li"},{href:"#wppres-3-example-of-rendering-a-twig-file-using-timber-wp-functions"}),"WPPRES-3: Example of Rendering a .twig file using Timber WP functions")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",s({parentName:"li"},{href:"#wppres-4-example-php-functionsphp"}),"WPPRES-4: Example PHP functions.php")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",s({parentName:"li"},{href:"#wppres-5-creating-ajax-loading-example"}),"WPPRES-5: Creating AJAX (Loading example)"))))),Object(a.b)("h2",{id:"wppres-1-faq"},"WPPRES-1: FAQ"),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Q: I'm having a database connection failure through MAMP")),Object(a.b)("p",null,"A: Double check the wp_options in the siteurl and home settings and that they correctly match MAMP. If you are on the default MAMP ports, you may need localhost:8888 in both addresses. Also check the wp_config.php file in your text editor to ensure the content URL is also correct."),Object(a.b)("p",null,"Also be sure to check your /etc/hosts file to see what address and terms are set up and that you restart the mySQL daemon, MAMP and Sequel Pro."),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Q: Adjust get_posts posts_per_page for a data",'["term"]'," request")),Object(a.b)("p",null,"A: Add it as an argument in twig or create a custom function adjusting the posts_per_page. You can pass any get_posts properties as arguments here."),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Q: Where can I find what I need?")),Object(a.b)("p",null,"A: Check against the staging website if it is up to grab things like taxonomies, types, and to figure out the layout."),Object(a.b)("h2",{id:"wppres-2-custom-type-relationships"},"WPPRES-2: Custom Type Relationships"),Object(a.b)("pre",null,Object(a.b)("code",s({parentName:"pre"},{className:"language-php"}),"// in author-articles.php\n\n// be sure to require it in the functions.php file!\n\n<?php\n\nclass AuthorArticles {\n\n    // Get all locations w/ recent posts\n    public static function getAuthorArticles($author) {\n\n        $args = new WP_Query([\n            'post_type' => 'post',\n            'no_found_rows' => true,\n            'fields' => 'ids',\n            'orderby' => 'date',\n            'order' => 'desc',\n            'meta_query' => [\n                    [\n                        'key' => 'article_author',\n                        'value' => $author,\n                        'compare' => 'LIKE'\n                    ]\n                ]\n        ]);\n\n        $postIds = $args->get_posts();\n\n        $results = Timber::get_posts($postIds);\n\n        return Timber::get_posts($postIds);\n    }\n\n}\n\n?>\n\n// example in use\n// Author Template - single-authors.php file\n\n<?php\n\n/* Template Name: Author */\n\n$data = Context::getDefaultContext();\n\n$data['author'] = Timber::get_post();\n\n$data['posts'] = AuthorArticles::getAuthorArticles($data['author']->id);\n\n$data['breadcrumbs'] = [\n    [\n        'text' => 'Authors',\n        'url' => $data['site']->url .'/authors'\n    ]\n];\n\n\nTimber::render('author.twig', $data);\n\n?>\n")),Object(a.b)("h2",{id:"wppres-3-example-of-rendering-a-twig-file-using-timber-wp-functions"},"WPPRES-3: Example of Rendering a .twig file using Timber WP functions"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"using the above examples")),Object(a.b)("pre",null,Object(a.b)("code",s({parentName:"pre"},{className:"language-html"}),'// __author.twig__\n\n{% if post.article_author %}\n{% set author = TimberPost(post.get_field(\'article_author\')) %}\n<div class="author-container">\n    <p>Article By</p>\n    <div class="author">\n        <div class="image">\n            {% set image = TimberImage(author.get_thumbnail) %}\n            {% include \'partials/image.twig\' with {\n                image: image,\n                size: \'square_400\'\n            } %}\n        </div>\n        <div class="info">\n            <h3 class="title">{{ author.title }}</h3>\n            {% for social in author.get_field(\'social\') %}\n                <div class=\'social\'>\n                    <a href=\'{{ social.url }}\' target="_blank" class=\'icon\'>\n                        <i class=\'{{ socialIcons[social.network] }}\'></i>\n                    </a>\n                    <a href=\'{{ social.url }}\' target="_blank">\n                        <span>{{ social.display }}</span>\n                    </a>\n                </div>\n            {% endfor %}\n            <a class="authorlink" href="{{ author.link }}">View Author Page</a>\n        </div>\n    </div>\n</div>\n{% endif %}\n\n***\n\n// __list.twig__\n\n<div class="list -post">\n    <ul class="list-items">\n    {% for post in posts %}\n        {% include \'partials/post/list-item.twig\' %}\n    {% else %}\n        <p>Sorry, no posts matched your criteria</p>\n    {% endfor %}\n    </ul>\n</div>\n\n***\n\n__list-item.twig__\n\n<li class="list-item -post tile">\n    <a href="#">\n        <div class="image">\n            <img src="{{ post.get_thumbnail }}" alt="">\n        </div>\n        <div class="info">\n            <h3 class="title">{{ post.title }}</h3>\n            <p>{{ post.intro }}</p>\n            <div class="read-more">\n                <a href="{{ post.link }}">read more ></a>\n            </div>\n        </div>\n    </a>\n</li>\n')),Object(a.b)("h2",{id:"wppres-4-example-php-functionsphp"},"WPPRES-4: Example PHP functions.php"),Object(a.b)("pre",null,Object(a.b)("code",s({parentName:"pre"},{className:"language-php"}),"<?php\n\nadd_filter('show_admin_bar', '__return_false');\n\nrequire_once('functions/routes.php');\nrequire_once('functions/twig.php');\nrequire_once('functions/theme_support.php');\nrequire_once('functions/enqueue_scripts.php');\nrequire_once('functions/acf.php');\nrequire_once('functions/timber.php');\nrequire_once('functions/context.php');\nrequire_once('functions/locations.php');\nrequire_once('functions/author_articles.php');\nrequire_once('functions/infobox.php');\n\nif (!is_admin()) {\n    require_once('functions/post_filters.php');\n}\n\n?>\n")),Object(a.b)("h2",{id:"wppres-5-creating-ajax-loading-example"},"WPPRES-5: Creating AJAX (Loading example)"),Object(a.b)("p",null,"Using twig, variables were passed down to be used for things such as ",Object(a.b)("inlineCode",{parentName:"p"},"loadmore.twig"),", while a PHP class, routes and functions were set up to interact with the JS file."),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"function.php")),Object(a.b)("pre",null,Object(a.b)("code",s({parentName:"pre"},{className:"language-php"}),"<?php\n...\nrequire_once('functions/load_more.php');\n...\n?>\n")),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"loadmore.php")),Object(a.b)("pre",null,Object(a.b)("code",s({parentName:"pre"},{className:"language-php"}),"<?php\n\nclass LoadMore {\n    public function loadNextSet($params) {\n        $perPage = 6;\n        $page = $params['page'];\n        $category = $params['cat'];\n        $data = Context::getDefaultContext();\n        $data['category'] = new TimberTerm($category);\n        $data['tag'] = 'tag';\n\n        $posts = $data['category']->get_posts([\n          'posts_per_page' => $perPage,\n          'orderby' => 'date',\n          'order' => 'DESC',\n          'offset' => ($perPage*$page) + 3,\n        ]);\n\n        $data['posts'] = $posts;\n\n        Timber::render('partials/post/grid.twig', $data);\n        exit();\n    }\n}\n\n?>\n")),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"routes.php")),Object(a.b)("pre",null,Object(a.b)("code",s({parentName:"pre"},{className:"language-php"}),"...\n// $params are the :section, :cat and :page args\nRoutes::map(':section/:cat/:page', function($params){\n    $articles = new LoadMore();\n    echo $articles->loadNextSet($params);\n});\n...\n")),Object(a.b)("pre",null,Object(a.b)("code",s({parentName:"pre"},{}),"__loadmore.twig__\n\n```html\n<div class=\"loadmore-container\" data-page='1' data-section='{{ section }}' data-category='{{ category }}'>\n    <a>Load More</a>\n</div>\n")),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"load-more.js")),Object(a.b)("pre",null,Object(a.b)("code",s({parentName:"pre"},{className:"language-javascript"}),"var titleTagline = require('./title-tagline.js');\n\nvar loadMore = {\n    $loadMoreContainer: $('.loadmore-container'),\n    category: $('.loadmore-container').data('category'),\n    section: $('.loadmore-container').data('section'),\n    search: $('.loadmore-container').data('search'),\n    page: $('.loadmore-container').data('page'),\n    base_url: $('meta[name=base_url]').attr('content'),\n    perPage: 6,\n\n    init: function() {\n        // Show mega-menu when mega-menu link is focused\n        loadMore.$loadMoreContainer.on('click', function(e) {\n            e.preventDefault();\n            if ($('ul.grid').length > 0) {\n                loadMore.loadNextSection();\n            } else {\n                loadMore.loadNextSearch();\n            }\n        });\n    },\n\n    loadNextSection: function() {\n        return $.ajax({\n            url:\n                loadMore.base_url +\n                '/section/' +\n                loadMore.section +\n                '/' +\n                loadMore.category +\n                '/' +\n                loadMore.page,\n            type: 'GET',\n            success: loadMore.resultsSection,\n            error: loadMore.outputError\n        });\n    },\n\n    loadNextSearch: function() {\n        var urlString = loadMore.search;\n        urlString = urlString.replace(' ', '+');\n        console.log(urlString);\n        return $.ajax({\n            url:\n                loadMore.base_url +\n                '/search/' +\n                urlString +\n                '/' +\n                loadMore.page,\n            type: 'GET',\n            success: loadMore.resultsSearch,\n            error: loadMore.outputError\n        });\n    },\n\n    resultsSection: function(data) {\n        var numPosts = $(data).find('li.-post').length;\n        loadMore.page = parseInt(loadMore.page) + 1;\n        var render = $(data)\n            .find('li.-post')\n            .unwrap();\n        $('ul.grid')\n            .last()\n            .append(render);\n\n        if (numPosts < loadMore.perPage) {\n            loadMore.hideViewAll();\n        }\n\n        titleTagline.init();\n        titleTagline.doneResizing();\n    },\n\n    resultsSearch: function(data) {\n        console.log(data);\n\n        var numPosts = $(data).find('li.list-item').length;\n        loadMore.page = parseInt(loadMore.page) + 1;\n\n        var render = $(data)\n            .find('li.list-item')\n            .unwrap();\n        $('ul.list')\n            .last()\n            .append(render);\n\n        if (numPosts < loadMore.perPage) {\n            loadMore.hideViewAll();\n        }\n    },\n\n    hideViewAll: function() {\n        loadMore.$loadMoreContainer.css('display', 'none');\n    }\n};\n\nmodule.exports = {\n    init: loadMore.init\n};\n")),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"loadmore.php")),Object(a.b)("pre",null,Object(a.b)("code",s({parentName:"pre"},{className:"language-php"}),"<?php\n\nclass LoadMore {\n    public function loadNextLocationsSet($params) {\n        $perPage = 6;\n        $page = $params['page'];\n        $category = $params['cat'];\n        $data = Context::getDefaultContext();\n        $data['category'] = new TimberTerm($category);\n        $data['tag'] = 'tag';\n\n        $posts = $data['category']->get_posts([\n          'posts_per_page' => $perPage,\n          'orderby' => 'date',\n          'order' => 'DESC',\n          'offset' => ($perPage*$page) + 3,\n        ]);\n\n        $data['posts'] = $posts;\n\n        Timber::render('partials/post/grid.twig', $data);\n        exit();\n    }\n\n    public function loadNextSearchSet($params) {\n        $perPage = 6;\n        $page = (int)$params['page'];\n        $field = $params['search'];\n        $offset = ($perPage*$page) + 4;\n        $data = Context::getDefaultContext();\n        $search = get_query_var('s');\n        $searchTerm = htmlspecialchars($field);\n\n        $data['posts'] = SearchTerms::getSearchArticles($field, $offset, $perPage);\n\n        Timber::render('partials/post/list.twig', $data);\n        exit();\n    }\n\n    public function loadNextInspirationsSet($params) {\n\n        $exclusion = [];\n\n        $perPage = 6;\n        $page = $params['page'];\n        $category = $params['cat'];\n        $data = Context::getDefaultContext();\n        $data['category'] = new TimberTerm($category);\n        $data['tag'] = 'tag';\n\n        if($featuredIds = $data['category']->featured) {\n            $data['categoryFeatured'] = Timber::get_posts($featuredIds);\n            $exclusion = self::updateExclusionList($data['categoryFeatured'], $exclusion);\n        }\n\n        $posts = $data['category']->get_posts([\n            'posts_per_page' => $perPage,\n            'orderby' => 'date',\n            'order' => 'DESC',\n            'offset' => ($perPage*$page) + 4,\n            'post__not_in' => $exclusion,\n        ]);\n\n        $data['posts'] = $posts;\n\n        Timber::render('partials/post/grid.twig', $data);\n        exit();\n    }\n\n    static function updateExclusionList($original, $exclusion) {\n        foreach($original as $post) {\n            if($post) {\n                array_push($exclusion, $post->id);\n            }\n        }\n        return $exclusion;\n    }\n}\n\n?>\n")),Object(a.b)("h2",{id:"wppres-6-custom-search-terms"},"WPPRES-6: Custom Search Terms"),Object(a.b)("p",null,"This example was taken from YAC when it was required to search for a CPT ID and then use it to get some post ids returned with the latest meta data values."),Object(a.b)("pre",null,Object(a.b)("code",s({parentName:"pre"},{className:"language-php"}),"// from functions > search_term.php\n\nglobal $wpdb;\n\n$park_ids = [];\n$meta_arrays = [];\n$posts_park = [];\n\nif (strlen($search_term) > 3) {\n\n    $park_post_type='parks';\n    $park_post_status='publish';\n\n    // get the park ids that relate to the search\n    $park_args = $wpdb->get_col( $wpdb->prepare(\n            \"\n            SELECT ID\n            FROM $wpdb->posts WP\n            WHERE WP.post_title LIKE '%%%s%%'\n            AND post_type='%s'\n            AND post_status='%s'\n            \",\n            esc_sql($search_term),\n            esc_sql($park_post_type),\n            esc_sql($park_post_status)\n        )\n    );\n\n    $park_ids = $park_args;\n\n    if ($park_ids != null ) {\n\n        $park_ids = esc_sql( $park_ids );\n        $park_ids_str = \"'[^0-9]*\" . implode( \"[^0-9]*'|'[^0-9]*\", $park_ids ) . \"[^0-9]*'\";\n        $park = 'park';\n\n        //find the parks\n        $init_park = $wpdb->get_col( $wpdb->prepare(\n                \"\n                SELECT WP.ID\n                FROM $wpdb->posts WP\n                INNER JOIN $wpdb->postmeta PM\n                ON ( WP.ID = PM.post_id )\n                WHERE 1=1\n                AND ( ( PM.meta_key = %s\n                AND PM.meta_value REGEXP {$park_ids_str} ) )\n                AND WP.post_type = 'post'\n                AND (WP.post_status = 'publish')\n                GROUP BY WP.ID\n                ORDER BY WP.post_title DESC, WP.post_date DESC\n                \",\n                esc_sql($park)\n            )\n        );\n\n        // grab post results to allow metadata\n        // comparison for park\n        $results = Timber::get_posts($init_park);\n\n        // filter the results to ensure posts are associated with\n        // the latest and correct `park` value\n        if ($results) {\n            foreach ($results as $result) {\n                if (array_intersect($result->custom['park'], $park_ids)) {\n                    $posts_park[] = $result->id;\n                }\n            }\n        }\n    }\n}\n")))}l&&l===Object(l)&&Object.isExtensible(l)&&!l.hasOwnProperty("__filemeta")&&Object.defineProperty(l,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"manual/WordPress/WP-PC-Cheat-Sheet.md"}}),l.isMDXComponent=!0}}]);
//# sourceMappingURL=component---manual-word-press-wp-pc-cheat-sheet-md-0a0087706e37efa14ec4.js.map