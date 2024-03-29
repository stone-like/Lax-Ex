<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBuyproductOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('buyproduct_order', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger("order_id")->unsigned();
            $table->bigInteger("buyproduct_id")->unsigned();
            $table->foreign("order_id")->references("id")->on("orders")->onDelete("cascade");
            $table->foreign("buyproduct_id")->references("id")->on("buyproducts")->onDelete("cascade");
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
        Schema::dropIfExists('buyproduct_order');
    }
}
