<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger("address_id")->unsigned();
            $table->bigInteger("user_id")->unsigned();
            $table->bigInteger("order_status_id")->unsigned();
            $table->string("subtotal"); //税込みでの価格
            $table->string("discount"); //割引
            $table->integer("shipping_fee"); //送料
            $table->string("tax");
            $table->string("total"); //最終的な支払い
            $table->foreign("address_id")->references("id")->on("addresses")->onDelete("cascade");
            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
            $table->timestamps();
            $table->dateTime("shipped_at")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
