# Lax
クレジットカード決済型のECサイトです。  
user側とadmin側の機能があり、user側は/以降、admin側は/admin以降からアクセスします。  
admin側ではroleとpermissionを用いて権限設計をしました。  
バックエンドは軽量DDD(実際使ったのはrepository程度)、  
フロントエンドはEntity、Repository、UseCase含めて、完全にcoreの機能とreactを分離して書いています。  
ただvalidationはreact-hooks-form任せにしています。  
responsive対応でスマートフォンからでも見やすくなっています。
  
## インフラ構成  
![aws構成図 (1)](https://user-images.githubusercontent.com/47190494/93313033-e7e07b80-f842-11ea-91bd-2e0ee2840472.png)  
  
## user側動作例  
-**home**  
![home](https://user-images.githubusercontent.com/47190494/92988508-273b5f00-f507-11ea-983b-767b2bf9ea39.gif)  
-**product**  
![product](https://user-images.githubusercontent.com/47190494/92988530-37533e80-f507-11ea-925f-9f585411931a.gif)  
-**cart**  
![cart](https://user-images.githubusercontent.com/47190494/92988505-23a7d800-f507-11ea-82b0-730eec8343aa.gif)  
-**checkout**  
![checkout](https://user-images.githubusercontent.com/47190494/92988506-25719b80-f507-11ea-802c-4e81f4135420.gif)  
-**address**  
![address](https://user-images.githubusercontent.com/47190494/92988535-42a66a00-f507-11ea-8cee-e35b1df09010.gif)  
-**card**
![card](https://user-images.githubusercontent.com/47190494/92988536-433f0080-f507-11ea-819b-803946438a3d.gif)  

-**responsive_home**  
![responsive_home](https://user-images.githubusercontent.com/47190494/92989132-ce6ec500-f50c-11ea-9a71-ec4d522265c1.gif)  

## admin側動作例  
-**adminSideBar**  
![admin](https://user-images.githubusercontent.com/47190494/92988561-86996f00-f507-11ea-9c88-77775f538827.gif)  

-**admin_error,permissionがないことによりURLへのアクセスエラー**  
![admin_error](https://user-images.githubusercontent.com/47190494/92988560-85684200-f507-11ea-9a9c-da155667604f.gif)  

## URL  
http://lax-ex.net  
(admin側)  
http://lax-ex.net/admin  
  
  
## userLogin  
email:test@email.com  
password:password  
## adminLogin  
### super_admin  
email:superadmin@email.com  
password:password  
### admin  
email:admin@email.com  
password:password  
### staff  
email:staff@email.com  
password:password  

## テスト用のクレジットカード
4242 4242 4242 4242　09/40 555  
    
## 主な機能  
user側では  
-**商品の複数条件による検索**  
-**クレジットカードを用いた決済**  
-**カートへの一時的保存**  
-**注文した商品の確認**  
-**ユーザーの情報のアップデート**  
などができます。  
  
admin側では  
-**商品やユーザー、注文,パーミッション、ロールなどの追加、削除、更新ができます。画像を見ていただいた方がわかりやすいと思います。** 
-**初期ロールとしてsuper_admin、admin、staffの三つがあり、あらかじめそのロールごとにパーミッションを割り当てています**  
-**必要なパーミッションがないと特定のurlにはアクセス不可,apiを飛ばせたとしてもAuthenticationErrorが出るようにしています。**  


| super_admin | admin | staff |
| :--- | :---: | ---: |
| createCategory | createCategory | createCategory |
| createProduct | createProduct | createProduct |
| createDiscount | createDiscount | createDiscount |
| createShipping | createShipping | createShipping |
| updateOrder | updateOrder | updateOrder |
| createOrderStatus | createOrderStatus | createOrderStatus |
| createNews | createNews | createNews |
| changeUser | changeUser | changeUser |
| attachRoleAndPerm | attachRoleAndPerm | - |
| createAdmin | createAdmin | - |
| createRoleAndPerm | - | - |

-**パーミッションレベルで権限を管理しています。ロールもパーミッションも好きに作れますが、その権限(createRoleAndPerm)を持っているのはsuper_adminだけです。**  
-**もし時間を割いていただけるのであれば、下記のurlから見れるFeatureTest,フロント側のpermission制御、バック側のAPIの制御を見ていただいてもいいかもしれません。**   

-**FeatureTest**  
https://github.com/stone-like/Lax/tree/master/tests/Feature  
-**フロント側のpermission制御**  
https://github.com/stone-like/Lax/tree/master/resources/ts/ui/feature/admin/authenticatedRoute  
-**バック側のAPI**  
https://github.com/stone-like/Lax/blob/master/routes/api.php  


  
## 使用技術  
 -**フロントエンド**  
  typescript,フレームワークとしてreact  
 -**バックエンド**  
  php,フレームワークとしてlaravel  
 -**クレジットカード決済**  
  stripe  
   
 ## 技術選定理由  
  -**php,laravel**  
   初めてbackendで触った言語であることと、laravelの強力なDI、validationがとてもやりやすく感じた。  
  -**react**  
   vueと比べてよりjsに寄っていてtypesciptを使うなら個人的にはreactのほうが書きやすく、hooksの登場でコードの可読性、再利用性も上がっているので。  
  -**stripe**  
   公式Document、API、Testがとても充実していて導入する際にとても助けになった。  
   重要な情報を扱うからこそとても丁寧なガイドラインが存在するstripeを採用
   
   
   
   
  ## 主要フォルダ構成(上記までで中身が気になっていただいた方向け)  
  ### バックエンド側  
  -**DTO**  
  コントローラーからの出力、コントローラーへの入力の際に使用しています。  
  ![バックDTO](https://user-images.githubusercontent.com/47190494/92989671-b600a980-f510-11ea-9a20-f6c2d4e03c02.png)  
    
  -**コントローラー**  
  Repositoryとのデータの入出力を担っています。(バックエンド側ではUseCaseすら使用していないです。)  
  ![バックコントローラー](https://user-images.githubusercontent.com/47190494/92989670-b5681300-f510-11ea-85be-597c269601fe.png)  
    
  -**ModelAndRepository**  
  ModelとRepository、Requestが入っています。  
  Repositoryはコントローラーから受け取ったデータをもとにmodelから必要な情報を取り出します。    
  Requestはコントローラーでのバリデーションにつかっています。  
  ![バックmodelAndRepository](https://user-images.githubusercontent.com/47190494/92989668-b39e4f80-f510-11ea-8313-35bde55c3ce7.png)  
    
   -**Test**  
   バックエンドのTestです。  
   UnitTestではRespositoryの機能を、  
   FeatureではAPI～コントローラーのPermission、Validation、結合テストをしています。  
   ![バックTest](https://user-images.githubusercontent.com/47190494/92989669-b4cf7c80-f510-11ea-8cd1-d9d01326e19e.png)  
     
      
      
   ### フロントエンド側  
   フロントエンド側はまずcoreとuiに分かれています。  
   coreはframework等に依らない独立しているものです。(reactでもvueでも使える)
   uiはreact,reduxが入っています。こちらはフレームワークの領域となっています。
   
   -**core**  
   dto,entity,repository,usecaseなどが入っている部分です。  
   ![フロントcore](https://user-images.githubusercontent.com/47190494/92989857-628f5b00-f512-11ea-8bba-f724ef76d185.png)  
    -**DTO**  
    主にバックエンドからのデータをEntityに変換しています。  
    ![フロントDTO](https://user-images.githubusercontent.com/47190494/92989858-6327f180-f512-11ea-8993-893082569403.png)  
    -**Entity**  
    Entityです。Validationはreact-hooks-formに任せているので、完全とは言えません。  
    ![フロントEntity](https://user-images.githubusercontent.com/47190494/92989859-63c08800-f512-11ea-9915-13386dae36d9.png)  
    -**errorType**  
    バックエンドから返ってくることが想定されるerrorの型を定義してあるファイル群です。  
    Error処理も気を配ってみたので良ければ見ていただきたいです。(Result<Success,Failure>みたいに定義していて、Repositoryから見た方がわかりやすいかもしれないです。)  
    ![フロントerrorType](https://user-images.githubusercontent.com/47190494/92989860-64591e80-f512-11ea-8622-3508faab4f00.png)  
    -**Repository**  
    Repositoryです。バックエンドとのやり取りに使います。  
    ![フロントrepository](https://user-images.githubusercontent.com/47190494/92989865-66bb7880-f512-11ea-9bf2-68f89cb7fa2f.png)  
    -**UseCase**  
    主にここはつなぎとしてのみの役割。  
    ![フロントusecase](https://user-images.githubusercontent.com/47190494/92989869-67eca580-f512-11ea-8064-1058e7fc68fd.png)  
      
       
       
   -**ui**  
   uiはreactが入っているところです。AppとFeatureに分かれていて、Appには共通で使うようなpagination、loader、css等が入っていて、atureには普通のReactComponent群が入っています。  
    -**app**  
    ![フロントuiApp](https://user-images.githubusercontent.com/47190494/92989866-66bb7880-f512-11ea-8a69-bfae76ad0362.png)  
    -**feature**  
    ![フロントuiFeature](https://user-images.githubusercontent.com/47190494/92989868-67540f00-f512-11ea-836b-7a5e22b113c5.png)  
      
       
   -**util**  
   utilはreactHooksとか個々のerrorをまとめて使うためのErrorHandlerなどが入っています。  
   ![フロントutil](https://user-images.githubusercontent.com/47190494/92989870-68853c00-f512-11ea-81cf-e94c2fd3a73a.png)  
   
   
   -**StoreAndReduer**    
   定番のやつです。  
   ![フロントreducerAndStore](https://user-images.githubusercontent.com/47190494/92989863-6622e200-f512-11ea-80c3-1026d82c7882.png)    
   
    
    
    
    
   
  
