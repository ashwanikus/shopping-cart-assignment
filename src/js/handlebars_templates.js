const hbs = {
    dots: `{{#each banners}}
    <span class="dot"></span>
    {{/each}}`,
    category: `{{#each categories}}
                <section class="category__container">
                    <div class="category__container--box">
                        <div class="category_img">
                            <img src="{{imageUrl}}" alt="{{name}}"/>
                        </div>
                        <div class="category_desc">
                            <h3 tabindex="0">{{name}}</h3>
                            <p>
                                {{description}}
                            </p>
                            <a href="products.html" class="btn btn--default">Explore {{key}}</a>
                        </div>
                    </div>
                </section>            
                {{/each}}`,
    banners: `{{#each banners}}
                <div class="slideshow__container--fade">            
                    <img src="{{bannerImageUrl}}" alt="{{bannerImageAlt}}">
                </div>
                {{/each}}`,
    productsMenu: `{{#each categories}}
                    {{#ifFirstIndex @index}}
                        <li>
                            <input type="hidden" class="links_input" id="links_input{{@index}}" value="{{id}}"/>
                            <a class="links active" tabindex="0">{{name}}</a>
                        </li>
                    {{else}}
                        <li>
                            <input type="hidden" class="links_input" id="links_input{{@index}}" value="{{id}}"/>
                            <a class="links" tabindex="0">{{name}}</a>
                        </li>
                    {{/ifFirstIndex}}
                {{/each}}`,
    productListing: `{{#each products}}
                        <div class="products__boxmainlist--listingitems">
                            <h3 title="{{name}}" tabindex="0">{{name}}</h3>
                            <div class="product_Details">
                                <span><img src="{{imageURL}}" alt="{{name}}" srcset="" tabindex="0"></span>
                                <p title="{{description}}" tabindex="0">{{description}}</p>
                                <input type="hidden" class="item_id" id="item_id{{@index}}" value="{{id}}" />
                                <div class="price_tag">
                                    <a class="btn--default add_items" tabindex="0">Buy Now <span>MRP Rs.{{price}}</span></a>
                                </div>
                            </div>
                        </div>
                        {{/each}}`,
    cart_items: `{{#if item_in_cart}}
                    {{#each item_in_cart}}
                    <li tabindex="0">
                        <div class="cart-items">
                            <div class="cart-items__img">
                                <img src="{{imageURL}}" alt="{{name}}">
                            </div>
                            <div class="cart-items__detail">
                                <h5>{{name}}</h5>
                                <div>
                                    <button class="btn--default" onclick="cartEngine.changeQuantity('{{id}}', 'dec', '{{@index}}')">&minus;</button>
                                    <input type="text" value="{{count}}" id="item{{@index}}" class="prod_quantity">
                                    <button class="btn--default" onclick="cartEngine.changeQuantity('{{id}}', 'inc', '{{@index}}')">&plus;</button>
                                    <span class="price" id="price{{@index}}">Rs.{{price}}</span>
                                    <span class="total_price" id="total_price{{@index}}">Rs.{{multiply price count}}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    {{/each}}
                {{else}}
                    <li><div class="items">No item in carts...</div></li>
                {{/if}}`
};