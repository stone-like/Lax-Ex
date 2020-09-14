<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBuyproductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('buyproducts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string("name"); //buyproductの場合は別にユニークな名前じゃなくてもいい、引き出すときはorderから引き出せばいい
            $table->string("slug");
            $table->integer("buyQuantity")->unsigned();
            $table->integer("price")->unsigned();
            $table->string("subtotal");
            $table->string("imagePath");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('buyproducts');
    }
}
