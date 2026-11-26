/* ZAIN bilingual layer. Arabic is the source language and the default. English is applied by
   translating text, placeholders and labels in place, including content the pages render later.
   Other pages can register extra pairs with ZAIN_I18N.add({'arabic':'english'}). */
(function(){
'use strict';
var KEY='zain_lang',D={};
function add(o){for(var k in o)D[k]=o[k];sorted=null}
var sorted=null,rx=null;
add({
/* ---- drawer + services ---- */
'المعرض':'Gallery','القائمة':'Menu','القائمة الرئيسية':'Main menu','صُنع خصيصًا لك':'Made for You','الترميم والصيانة':'Restoration & Care','مشغولات بتفاصيل فريدة':'Handcrafted pieces with singular detail',
'خدماتنا':'Our Services','عناية بقطعتك، وصياغة لما تتمناه':'Care for the piece you own, and craft for the one you imagine.',
'أرسل صور قطعتك واحصل على تسعير مبدئي، وتعود إليك كأنها وُلدت من جديد.':'Send photos of your piece and receive a preliminary quote. It returns to you as though newly made.',
'احكِ لنا ما تتمناه، ونحوّله إلى قطعةٍ فريدة تحمل توقيعك.':'Tell us what you imagine, and we will turn it into a singular piece that carries your signature.',
'ابدأ طلب الترميم ←':'Begin a restoration request →','اطلب قطعتك الخاصة ←':'Request your own piece →',
/* ---- repairs / custom / repairs-admin ---- */
'زين | الترميم والصيانة':'ZAIN | Restoration & Care',
'خدمة ترميم وصيانة المشغولات والمجوهرات من زين: أرسل صور قطعتك واحصل على تسعير مبدئي.':'ZAIN restoration and care for handcrafted pieces and jewellery. Send photos of your piece and receive a preliminary quote.',
'المعرض ←':'Gallery →','صُنع خصيصًا لك ←':'Made for You →','الترميم والصيانة ←':'Restoration & Care →','لوحة الإدارة ←':'Admin panel →',
'تعود قطعتك إليك كأنها وُلدت من جديد: تشطيبٌ متقن، صيانةٌ شاملة، وعنايةٌ بأدقّ التفاصيل، حتى تستعيد بريقها الأول':'Your piece returns to you as though newly born: a flawless finish, thorough restoration, and care for the finest detail, until it regains its first radiance.',
'أرسل صور القطعة ووصف المشكلة':'Send photos of the piece and describe the issue','تسعير مبدئي من الفريق':'A preliminary quote from our team','موافقتك ودفع العربون':'Your approval and the deposit','شحن القطعة إلينا':'Ship the piece to us','معاينة، ثم ترميم وإعادة القطعة':'Inspection, restoration, and the piece returned to you',
'طلب ترميم جديد':'New restoration request','لا يلزم حساب. احتفظ برابط المتابعة الذي يظهر لك بعد الإرسال.':'No account needed. Keep the tracking link shown after you submit.',
'الاسم':'Name','رقم الهاتف / واتساب':'Phone / WhatsApp','نوع القطعة':'Type of piece','حلق':'Earring','سوار':'Bracelet','سبحة':'Prayer beads','قلادة':'Necklace',
'وصف المشكلة بالتفصيل':'Describe the issue in detail','مثال: كسر في الإطار، فقدان حجر، تغيّر اللون، حاجة إلى تلميع...':'For example: a broken setting, a missing stone, discolouration, a need for polishing...','صور القطعة (من 1 إلى 6)':'Photos of the piece (1 to 6)',
'السعر الذي تراه أولًا تسعيرٌ مبدئي مبنيّ على الصور. يُؤكَّد السعر النهائي بعد وصول القطعة ومعاينتها، ولا يبدأ العمل إلا بموافقتك عليه.':'The price you see first is a preliminary quote based on the photos. The final price is confirmed once the piece arrives and has been inspected, and work begins only with your approval.',
'إرسال الطلب':'Submit request','تتبّع طلب سابق':'Track a previous request','ألصق رابط المتابعة أو رمز الطلب الذي وصلك.':'Paste the tracking link or order code you received.','رمز المتابعة':'Tracking code','عرض الحالة':'View status',
'زين | ZAIN — مشغولات بتفاصيل فريدة':'ZAIN. Handcrafted pieces with singular detail.','زين | ZAIN &mdash; مشغولات بتفاصيل فريدة':'ZAIN. Handcrafted pieces with singular detail.',
'قيد المراجعة':'Under review','تسعير مبدئي بانتظار موافقتك':'Preliminary quote awaiting your approval','بانتظار العربون':'Awaiting the deposit','بانتظار تأكيد العربون':'Awaiting deposit confirmation','تم تأكيد العربون، بانتظار شحن القطعة':'Deposit confirmed, awaiting shipment of the piece',
'القطعة في الطريق إلينا':'The piece is on its way to us','وصلت القطعة وجارٍ معاينتها':'The piece has arrived and is being inspected','السعر النهائي بانتظار موافقتك':'Final price awaiting your approval','جارٍ العمل على قطعتك':'Work on your piece is under way','قطعتك جاهزة وفي طريقها إليك':'Your piece is ready and on its way to you',
'تم تسليم القطعة':'The piece has been delivered','تم الاعتذار عن الطلب':'The request was declined','أُلغي الطلب':'The request was cancelled','تم تأكيد العربون، وسيبدأ التنفيذ قريبًا':'Deposit confirmed. Work will begin shortly.','قطعتك قيد التنفيذ على يد حِرفيّينا':'Your piece is being made by our craftsmen','قطعتك جاهزة':'Your piece is ready',
'ج.م':'EGP','تعذرت معالجة الصورة':'The photo could not be processed','صورة غير صالحة':'Invalid photo','أرفق صورة واحدة على الأقل':'Attach at least one photo','جارٍ رفع الصور وإرسال الطلب...':'Uploading photos and sending the request...','رمز غير صالح':'Invalid code','لم يُعثر على الطلب':'Request not found','رقم الطلب:':'Request number:',
'التسعير المبدئي':'Preliminary quote','السعر النهائي بعد المعاينة':'Final price after inspection','هذا تسعير مبدئي مبنيّ على الصور، ويُؤكَّد السعر النهائي بعد وصول القطعة ومعاينتها. العربون:':'This is a preliminary quote based on the photos. The final price is confirmed once the piece arrives and has been inspected. Deposit:','يحدده الفريق':'to be set by the team',
'أوافق على التسعير المبدئي':'I accept the preliminary quote','اعتذر':'Decline','حوّل العربون':'Transfer the deposit','عبر فودافون كاش أو إنستاباي إلى':'via Vodafone Cash or InstaPay to','أتممتُ تحويل العربون':'I have transferred the deposit',
'وصلنا عربونك، شكرًا لثقتك. بدأ فريقنا بالتجهيز لتنفيذ قطعتك، وسنوافيك بكل خطوة هنا.':'We have received your deposit. Thank you for your trust. Our team has begun preparing your piece, and we will keep you updated at every step here.',
'وصلنا عربونك، شكرًا لثقتك. سيصلك عنوان الشحن عبر واتساب. بعد الشحن اضغط الزر أدناه.':'We have received your deposit. Thank you for your trust. The shipping address will reach you on WhatsApp. Once shipped, tap the button below.',
'تم شحن القطعة':'The piece has been shipped','أوافق على السعر النهائي':'I accept the final price','أعيدوا القطعة إليّ':'Please return the piece to me',
'زين | صُنع خصيصًا لك':'ZAIN | Made for You','اطلب قطعة تُصاغ خصيصًا لك: صف فكرتك واحصل على تسعير مبدئي من زين.':'Request a piece crafted just for you. Describe your idea and receive a preliminary quote from ZAIN.',
'خبرةٌ عريقة في عالم الصياغة، وأحدث تقنيات التصنيع بين أيدينا. نُصنّع لكبرى العلامات جملةً، ونصنع لك قطعةً قطعة. احكِ لنا ما تتمناه، ودعنا نحوّله إلى واقعٍ يفوق الخيال':'A long-standing mastery of the goldsmith\u2019s craft, and the latest manufacturing technology in our hands. We make for leading brands in volume, and for you, one piece at a time. Tell us what you imagine, and let us turn it into something beyond imagination.',
'صف القطعة التي تتخيّلها وأرفق صورة مرجعية':'Describe the piece you imagine and attach a reference photo','تنفيذ القطعة بيد حِرفيّينا':'Your piece made by our craftsmen','تسليم قطعتك جاهزة':'Your finished piece delivered','طلب قطعة خاصة':'Request a bespoke piece','تصميم خاص آخر':'Another custom design',
'وصف القطعة المطلوبة (الخامة، المقاس، اللون، المناسبة)':'Describe the piece you would like (material, size, colour, occasion)','مثال: خاتم بحجر فيروز وإطار مذهّب، مقاس ١٦، هدية لعيد زواج...':'For example: a ring with a turquoise stone and a gilded setting, size 16, an anniversary gift...','صور مرجعية للفكرة (اختياري، حتى 6 صور)':'Reference photos for the idea (optional, up to 6)',
'السعر الذي تراه أولًا تسعيرٌ مبدئي مبنيّ على وصفك وصورك المرجعية. قد يتغيّر قليلًا إن تغيّرت التفاصيل، ولا يبدأ التنفيذ إلا بعد موافقتك ودفع العربون.':'The price you see first is a preliminary quote based on your description and reference photos. It may change slightly if the details change, and work begins only after your approval and the deposit.',
'زين | إدارة الترميم':'ZAIN | Restoration Management','طلبات الترميم والتصنيع الخاص':'Restoration and bespoke requests','جارٍ التحقق من الصلاحيات...':'Verifying permissions...',
'جديد - بانتظار التسعير':'New, awaiting a quote','تم التسعير المبدئي':'Preliminary quote sent','وافق - بانتظار العربون':'Approved, awaiting the deposit','العميل حوّل العربون - أكّد الاستلام':'Client transferred the deposit, confirm receipt','العربون مؤكد - بانتظار الشحن':'Deposit confirmed, awaiting shipment','العميل شحن القطعة':'Client shipped the piece','وصلت القطعة':'Piece arrived',
'السعر النهائي بانتظار موافقة العميل':'Final price awaiting client approval','قيد الترميم / التنفيذ':'In restoration / production','جاهزة للإرجاع':'Ready to return','تم التسليم':'Delivered','اعتذر العميل':'Client declined','بدء التنفيذ':'Start work','القطعة جاهزة':'Piece ready','تم تسليمها للعميل':'Delivered to the client',
'إرسال التسعير المبدئي':'Send the preliminary quote','تأكيد استلام العربون':'Confirm deposit received','تم استلام القطعة':'Piece received','تثبيت السعر النهائي':'Set the final price','خطأ:':'Error:','لا توجد طلبات بعد':'No requests yet','[صُنع خصيصًا]':'[Bespoke]','[ترميم]':'[Restoration]',
'العربون':'Deposit','السعر النهائي':'Final price','ملاحظة تظهر للعميل':'Note shown to the client','اكتب التسعير المبدئي أولًا':'Enter the preliminary quote first','اكتب السعر النهائي أولًا':'Enter the final price first','حفظ الأسعار والملاحظة فقط':'Save prices and note only','إلغاء الطلب':'Cancel the request','تأكيد الإلغاء؟':'Confirm cancellation?',
/* ---- shared / gallery ---- */
'زين | ZAIN — متجر المشغولات والمجوهرات':'ZAIN | Handcrafted Jewellery & Silverwork',
'زين | ZAIN — متجر الخواتم والحلقان والأساور والسبح والأحجار والمشغولات اليدوية.':'ZAIN. Rings, earrings, bracelets, prayer beads, gemstones and handcrafted silverwork.',
'اكتشف تشكيلة زين من المشغولات والمجوهرات الفاخرة.':'Discover the ZAIN collection of fine handcrafted jewellery.',
'زين | المتجر':'ZAIN | Store',
'زيـن':'ZAIN','زين':'ZAIN','زين | ZAIN':'ZAIN',
'ZAIN HANDCRAFTED':'HANDCRAFTED',
'دخول المسوقين والإدارة':'Team Sign-in',
'MODELS · COMING SOON':'THE NEXT COLLECTION','موديلات':'New Designs','قريبًا — انتظرونا':'Coming soon. Stay with us.',
'فن التفاصيل':'The art of detail','وأناقة الاختيار':'and the elegance of choice',
'اكتشف تشكيلتنا من الخواتم والحلقان والأساور والسُبح والأحجار المختارة بعناية. تصفح بحرية بدون تسجيل دخول.':'Discover our collection of rings, earrings, bracelets, prayer beads and carefully chosen stones. Browse freely, no sign-in required.',
'اكتشف الأقسام':'Explore the collections',
'أقسام المعرض':'The Collections',
'اختر القسم لاستعراض تصميماته ومنتجاته':'Choose a collection to view its designs and pieces.',
'خواتم':'Rings','حلقان':'Earrings','أساور':'Bracelets','سبح':'Prayer Beads','أحجار':'Gemstones',
'رسم توضيحي لقسم':'Illustration of the collection',
'الأكثر مبيعًا':'Best Sellers','القطع الأكثر طلبًا من عملائنا':'The pieces our clients request most.',
'الإرث الفرعوني':'Pharaonic Heritage','إكسسوارات مستوحاة من رموز مصر القديمة':'Accessories inspired by the symbols of ancient Egypt.',
'تشكيلة قادمة قريبًا':'A collection arriving soon','تشكلة قادمة قريبًا':'A collection arriving soon','قطع مصنوعة يدويًا بروح الفراعنة':'Handmade pieces with the spirit of the pharaohs',
'جميع المنتجات':'All Pieces',
'الأسعار غير معروضة — اطلب تفاصيل المنتج عبر واتساب':'Prices are not displayed. Ask for details on WhatsApp.',
'ابحث باسم المنتج أو الكود...':'Search by name or code...','بحث عن منتج':'Search pieces','عرض الكل':'View all',
'ملحوظة: صور واجهات الأقسام صور عرض توضيحية، وليست صور منتجات زين. المنتجات الفعلية تُضاف إلى كتالوج الموقع.':'Note: the collection cover images are illustrative and are not photographs of ZAIN pieces. Actual products are added to the catalogue as they are published.',
'زين | ZAIN — مشغولات بتفاصيل فريدة':'ZAIN. Handcrafted pieces with singular detail.',
'إغلاق':'Close','قريبًا تصميمات مميزة هنا':'Distinctive designs, coming soon',
'لا توجد منتجات مطابقة حاليًا. جرّب قسمًا آخر.':'No matching pieces at the moment. Try another collection.',
'المعرض جاهز لاستقبال صور منتجات زين الحقيقية.':'The gallery is ready to receive ZAIN\u2019s real product photography.',
'منتج زين':'ZAIN piece','استفسر عبر واتساب':'Enquire on WhatsApp','تواصل معنا عبر واتساب':'Chat with us on WhatsApp',
'مرحبًا بك في متجر زين':'Welcome to the ZAIN store','جاري فتح المتجر...':'Opening the store...','اضغط هنا لفتح المتجر':'Tap here to open the store',
/* ---- login ---- */
'زين | دخول الفريق':'ZAIN | Team Sign-in',
'تسجيل دخول المسوقين والإدارة فقط':'Sign-in for marketers and administrators only',
'تصفح معرض المنتجات بدون تسجيل دخول ←':'Browse the gallery without signing in →',
'البريد الإلكتروني':'Email','كلمة المرور':'Password','إظهار':'Show','إخفاء':'Hide','دخول إلى زين':'Sign in to ZAIN','العودة إلى الموقع':'Back to the site',
'جاري تسجيل الدخول...':'Signing in...','تعذر الدخول:':'Unable to sign in:','لم يتم إنشاء جلسة دخول، حاول مرة أخرى':'No session was created. Please try again.',
'جاري التأكد من صلاحية الحساب...':'Verifying the account...','تعذر التحقق من الصلاحيات:':'Unable to verify permissions:',
'تم تسجيل الدخول لكن الحساب غير مفعّل في إدارة الفريق. اطلب من الأدمن تفعيله.':'Signed in, but the account is not yet activated in team management. Ask the admin to activate it.',
'الجلسة لم تُحفظ في المتصفح، لم يتم تحويلك. جرّب متصفح Chrome مباشرة.':'The session was not saved in the browser, so you were not redirected. Try Chrome directly.',
'تم الدخول بنجاح، جاري فتح لوحة الإدارة...':'Signed in. Opening the admin panel...','خطأ في الاتصال:':'Connection error:','حاول مجددًا':'Please try again',
/* ---- gallery admin ---- */
'إدارة منتجات زين':'ZAIN Product Management','إدارة معرض زين':'ZAIN Gallery Management','فتح معرض العملاء':'Open the customer gallery',
'جاري التحقق من صلاحيات الإدارة...':'Verifying admin permissions...','سجّل دخولك بحساب الإدارة أولًا':'Sign in with an admin account first',
'إضافة / تعديل منتج':'Add / Edit a product','القسم':'Collection','اسم المنتج':'Product name','كود المنتج':'Product code','صورة المنتج':'Product photo','وصف المنتج':'Product description',
'نشر المنتج للعملاء':'Publish to customers','حفظ ونشر':'Save and publish','إلغاء التعديل':'Cancel editing','المنتجات المحفوظة':'Saved products',
'يلزم تسجيل الدخول':'Sign-in required','الحساب لا يملك صلاحية الإدارة':'This account has no admin permission','لوحة المنتجات جاهزة':'Product panel ready',
'خطأ تحميل المنتجات:':'Error loading products:','تعديل':'Edit','حذف':'Delete','تأكيد حذف المنتج؟':'Confirm deleting this product?','تم الحذف':'Deleted',
'جاري رفع وحفظ المنتج...':'Uploading and saving the product...','الصورة JPG/PNG/WEBP وأقل من 8 ميجا':'Photo must be JPG/PNG/WEBP and under 8 MB','اختر صورة للمنتج':'Choose a product photo',
'تم حفظ المنتج بنجاح':'Product saved successfully','تعذر الحفظ:':'Unable to save:',
/* ---- dashboard ---- */
'زين | إدارة أوردرات المشغولات اليدوية':'ZAIN | Handcrafted Order Management',
'معرض المنتجات العام ↗':'Public gallery ↗','الرجوع إلى الرئيسية':'Back to home','شعار زين':'ZAIN logo','الرئيسية':'Home',
'مشغولات فضية هاند ميد · إدارة الأوردرات':'Handmade silverwork · Order management','تسجيل خروج':'Sign out',
'متابعة طلبك':'Track your order','تابع حالة أوردر زين بدون تسجيل حساب، باستخدام رابط المتابعة الخاص بك.':'Follow your ZAIN order without an account, using your personal tracking link.',
'رمز المتابعة الخاص بالطلب':'Order tracking code','الصق رمز المتابعة':'Paste the tracking code','عرض حالة الطلب':'View order status','العودة لتسجيل الدخول':'Back to sign-in',
'طلب انضمام لفريق زين':'Request to join the ZAIN team','سجّل بياناتك. حسابك يفضل معلق لحد ما الأدمن يوافق عليه.':'Enter your details. Your account stays pending until the admin approves it.',
'الاسم الكامل':'Full name','إرسال طلب الانضمام':'Send join request','الرجوع لتسجيل الدخول':'Back to sign-in',
'تعيين كلمة مرور جديدة':'Set a new password','اكتب كلمة المرور الجديدة لحساب زين':'Enter the new password for your ZAIN account','كلمة المرور الجديدة':'New password','تأكيد كلمة المرور':'Confirm password','حفظ كلمة المرور':'Save password',
'جاري فتح لوحة زين...':'Opening the ZAIN panel...','دخول زين الجديد':'New ZAIN sign-in','لوحة الإدارة':'Admin panel','التنقل':'Navigation','القائمة الجانبية':'Menu',
'أوردر سريع':'Quick order','بحث حالة طلب':'Order status search','ابحث بكود الأوردر أو اسم العميل':'Search by order code or client name','مثال: silver1023 أو اسم العميل':'Example: silver1023 or client name',
'قائمة أقسام الموقع':'Site sections menu','الرئيسية والإحصائيات':'Home and statistics','متابعة الأوردرات':'Track orders','أوردر بالتفصيل':'Detailed order','سجل التحديثات':'Update log',
'رابط متابعة العميل':'Client tracking link','إدارة الفريق':'Team management','استيراد الأوردرات':'Import orders','لوحة التحكم':'Control panel','إدارة الأوردرات والفريق':'Order and team management',
'الرئيسية · الإحصائيات':'Home · Statistics','جاري الاتصال بقاعدة البيانات المشتركة...':'Connecting to the shared database...','إدارة الفريق والصلاحيات':'Team and permissions',
'طلبات الانضمام الجديدة تظهر هنا بعد تأكيد البريد الإلكتروني. وافق على العضو أو ارفضه، ثم حدد صلاحياته. لا تمنح صلاحية أدمن إلا لمن تثق فيه.':'New join requests appear here once the email is confirmed. Approve or reject the member, then set their role. Grant admin access only to someone you trust.',
'تحديث الفريق':'Refresh team','إنشاء رابط متابعة للعميل':'Create a client tracking link','اكتب كود الأوردر واختر إنشاء الرابط، ثم ابعته للعميل. الرابط خاص بالطلب ولا يحتاج حساب.':'Enter the order code and create the link, then send it to the client. The link is specific to the order and needs no account.',
'كود الأوردر':'Order code','إنشاء رابط المتابعة':'Create tracking link','ملخص المتابعة':'Tracking summary','أقسام الأوردرات':'Order sections',
'استيراد الأوردرات المؤكدة':'Import confirmed orders','راجع الأوردرين. الصور الأصلية من المحادثة غير متاحة للموقع تلقائيًا؛ اختار صورة كل أوردر من موبايلك لو عايزها تتحفظ معاه. تقدر تستورد البيانات بدون صور وتضيف الصور لاحقًا.':'Review the two orders. The original photos from the chat are not available to the site automatically; pick each order\u2019s photo from your phone if you want it saved with the order. You can import the data without photos and add them later.',
'حفظ الأوردرات غير الموجودة':'Save orders not yet in the system','إضافة تأكيد سريع':'Add a quick confirmation',
'سجّل الأوردر بسرعة، وارفع صورته واكتب ملاحظاته لو حابب. وتقدر تعدّل باقي التفاصيل بعدين.':'Record the order quickly, upload its photo and add notes if you like. You can edit the remaining details later.',
'كود الأوردر *':'Order code *','نوع الأوردر *':'Order type *','خاتم':'Ring','إنسيال':'Pendant (Insiyal)','الاسم (اختياري)':'Name (optional)','الاسم على القطعة':'Name on the piece',
'المقاس (اختياري)':'Size (optional)','صور الأوردر (حتى 12 صورة)':'Order photos (up to 12)','اختار صورة من المعرض أو الكاميرا':'Choose a photo from the gallery or camera','معاينة صورة التأكيد السريع':'Quick confirmation photo preview',
'ملاحظات الأوردر (اختياري)':'Order notes (optional)','مثلاً: لون الفص، الاسم، تفاصيل النقش أو تعليمات التشغيل':'For example: stone colour, name, engraving details or production instructions',
'تأكيد الأوردر الآن':'Confirm the order now','تسجيل تأكيد جديد':'Record a new confirmation','اسم العميل / الاسم على الخاتم':'Client name / name on the ring','محمد كمال حسين':'Mohamed Kamal Hussein',
'المقاس':'Size','نوع الحجر':'Stone type','حجر المزاج':'Mood stone','حجر التنين':'Dragon stone','عين التنين':'Dragon\u2019s eye','أخرى':'Other','تاريخ ووقت التأكيد':'Confirmation date and time','تاريخ ووقت التأكيد *':'Confirmation date and time *',
'اسم العامل':'Craftsman name','اسم المسؤول':'Supervisor name','ارفع صور تصميم الخاتم':'Upload ring design photos','من المعرض أو الكاميرا':'From the gallery or camera','معاينة الصورة':'Photo preview',
'تاريخ التسليم المتوقع (اختياري)':'Expected delivery date (optional)','أولوية الأوردر':'Order priority','عادي':'Normal','مستعجل':'Urgent','هل توجد مشكلة؟':'Is there an issue?','لا':'No','نعم':'Yes',
'تفاصيل الصورة أو النقش أو لون الحجر أو تعليمات التشغيل':'Photo details, engraving, stone colour or production instructions','تسجيل التأكيد':'Record confirmation',
'جدول متابعة الأوردرات':'Order tracking table','إفراغ سلة المحذوفات نهائيًا':'Empty the trash permanently','تصدير CSV':'Export CSV','بحث بالكود أو الاسم أو العامل':'Search by code, name or craftsman',
'كل المراحل':'All stages','تحت التصميم':'In design','تم التأكيد':'Confirmed','تحت التشغيل':'In production','في التشطيب':'In finishing','متشطب':'Finished','وصل المخزن':'Arrived at the store','جاهز للتسليم':'Ready for delivery','استلمه المخزن':'Received by the store',
'كل الحسابات':'All accounts','معلق':'Pending','اتحاسبنا':'Settled','أوردر محدد':'orders selected','تحديد الظاهر':'Select visible','إلغاء التحديد':'Clear selection','المرحلة الجديدة':'New stage','اختار المرحلة الجديدة':'Choose the new stage','حفظ الحالة للمحدد':'Save status for selected',
'تحديد':'Select','الصورة':'Photo','الكود':'Code','الاسم / التفاصيل':'Name / Details','المقاس / الحجر':'Size / Stone','العامل':'Craftsman','تاريخ التأكيد':'Confirmation date','التسليم المتوقع':'Expected delivery','مرحلة التنفيذ':'Production stage','الحساب':'Account','الأولوية':'Priority','مشكلة':'Issue','تفاصيل':'Details',
'معرض صور الأوردرات':'Order photo gallery','صورة الأوردر':'Order photo','صورة الأوردر بالحجم الكبير':'Order photo, full size','→ السابق':'← Previous','التالي ←':'Next →','اضغط مرتين للتكبير · اسحب للتنقل':'Double-tap to zoom · drag to move',
'تعديل بيانات الأوردر':'Edit order details','الاسم على الخاتم':'Name on the ring','موعد التسليم الاختياري':'Optional delivery date','مشكلة؟':'Issue?','إضافة صور جديدة (حتى 12 صورة إجمالًا)':'Add new photos (up to 12 in total)','الملاحظات':'Notes','حفظ التعديلات':'Save changes','إلغاء':'Cancel',
'تعذر تشغيل لوحة زين':'Unable to start the ZAIN panel','العودة لصفحة الدخول':'Back to the sign-in page','تعذر تحميل البيانات':'Unable to load data','رابط غير صحيح أو الطلب غير متاح':'Invalid link, or the order is unavailable','ملغي':'Cancelled','تم إلغاء الطلب':'This order has been cancelled',
'المرحلة الحالية:':'Current stage:','تعذر الاتصال، ستتم إعادة المحاولة':'Unable to connect. Retrying.','جاري الاستعلام...':'Looking up...','جاري إنشاء الرابط...':'Creating the link...','تعذر إنشاء الرابط: تأكد من تفعيل قاعدة بيانات المتابعة وصلاحياتك.':'Unable to create the link. Make sure the tracking database is enabled and that you have permission.',
'لم يتم العثور على الأوردر.':'Order not found.','رابط العميل جاهز:':'Client link ready:','نسخ الرابط':'Copy link','تم النسخ ✓':'Copied ✓','انسخ الرابط':'Copy the link','دفع عربون':'Deposit paid','الكل':'All','حفظ الحالة':'Save status','حفظ الحساب':'Save account',
'اكتب كود الأوردر أو اسم العميل لعرض حالته الحالية.':'Enter an order code or client name to see its current status.','بدون اسم':'No name','الحالة:':'Status:','في سلة المحذوفات':'In the trash','لا يوجد أوردر مطابق.':'No matching order.',
'كل الأوردرات':'All orders','مؤكدة':'Confirmed','متشطبة':'Finished','وصلت المخزن':'Arrived at the store','استلمها المخزن':'Received by the store','اتحاسبنا عليها':'Settled','فيها مشاكل':'With issues','متأخر':'Overdue','متأخرة':'Overdue','مستعجلة':'Urgent',
'سلة المحذوفات':'Trash','حساب معلق':'Account pending','الأوردرات':'Orders','عرض أوردرات':'View orders','عرض الأوردرات ←':'View orders →','تحديد الأوردر':'Select order','صورة الخاتم':'Ring photo','عرض':'View','استرجاع':'Restore',
'لا توجد أوردرات مطابقة':'No matching orders','تحديد الأوردر للتحديث الجماعي':'Select order for bulk update','تصميم الخاتم':'Ring design','· مقاس':'· size','المرحلة':'Stage','لا توجد تحديثات بعد':'No updates yet','الحد الأقصى 12 صورة للأوردر':'Maximum 12 photos per order',
'خطأ في تحميل الأوردرات:':'Error loading orders:','أوردر':'orders','متصل بالسيرفر المشترك ✓':'Connected to the shared server ✓','الهواري':'Al-Hawwari','الهواري على الجانبين؛ نفس الصورة على الجانبين':'Al-Hawwari on both sides; same photo on both sides','أبو البنات / أبو مالك':'Abu Al-Banat / Abu Malek',
'جانب: أبو البنات؛ الجانب الآخر: أبو مالك؛ صورتان مختلفتان':'One side: Abu Al-Banat; other side: Abu Malek; two different photos','صورة الأوردر (اختياري)':'Order photo (optional)','موجود بالفعل — لن يتم تكراره':'Already exists. It will not be duplicated.','جاهز للاستيراد':'Ready to import','موجود بالفعل — تم التخطي':'Already exists. Skipped.',
'تم حفظ الأوردر':'Order saved','تم حفظ':'Saved','أوردر، وتخطي':'orders, skipped','موجود بالفعل':'already exist','قبل حدوث خطأ:':'before an error occurred:','جاري تحميل الفريق...':'Loading the team...','تعذر تحميل الفريق:':'Unable to load the team:',
'عندك':'You have','طلب انضمام أو حساب موقوف · إجمالي':'join requests or suspended accounts · total','لا توجد طلبات معلقة · إجمالي':'No pending requests · total','عضو الفريق':'Team member','(حسابك)':'(your account)','بانتظار الموافقة / موقوف':'Awaiting approval / suspended',
'الصلاحية':'Role','عامل':'Craftsman','مدير':'Manager','أدمن':'Admin','الحالة':'Status','مفعل':'Active','موقوف':'Suspended','لا توجد حسابات متاحة للعرض.':'No accounts available to show.',
'لا يمكنك إيقاف حساب الأدمن الحالي أو سحب صلاحياته من هذه الشاشة':'You cannot suspend the current admin account or remove its permissions from this screen','تأكيد تعديل صلاحية وحالة هذا الحساب؟':'Confirm changing this account\u2019s role and status?','جاري حفظ الصلاحيات...':'Saving permissions...',
'السيرفر رفض التعديل أو لا توجد صلاحية كافية':'The server rejected the change, or permission is insufficient','✓ تم حفظ التعديل على السيرفر':'✓ Change saved on the server','فشل التعديل:':'Update failed:','تعذر التحقق من صلاحية الحساب':'Unable to verify account permissions','حسابك بانتظار موافقة الأدمن أو موقوف حاليًا':'Your account is awaiting admin approval or is currently suspended',
'جاري إنشاء الحساب...':'Creating the account...','تم إرسال الطلب. أكد بريدك الإلكتروني لو وصلك رابط، وبعدها انتظر موافقة الأدمن. لا يمكنك الدخول قبل الموافقة.':'Request sent. Confirm your email if you receive a link, then wait for admin approval. You cannot sign in before approval.','تعذر التسجيل:':'Unable to register:',
'إخفاء كلمة المرور':'Hide password','إظهار كلمة المرور':'Show password','اكتب الإيميل وكلمة المرور':'Enter your email and password','تعذر الاتصال:':'Unable to connect:','حاول مرة أخرى':'Please try again','اكتب إيميل حسابك الأول':'Enter your account email first','جاري إرسال رابط تغيير كلمة المرور...':'Sending the password reset link...','تعذر الإرسال:':'Unable to send:',
'لو الإيميل مسجل، هتوصلك رسالة استعادة جديدة. افتح أحدث رسالة من Gmail.':'If the email is registered, a new recovery message will arrive. Open the latest message in Gmail.','رابط الاستعادة انتهى أو غير صالح. اطلب رابط جديد.':'The recovery link has expired or is invalid. Request a new one.','كلمتا المرور غير متطابقتين':'The passwords do not match','كلمة المرور لازم تكون 8 أحرف على الأقل':'The password must be at least 8 characters',
'جاري حفظ كلمة المرور...':'Saving the password...','تم تغيير كلمة المرور بنجاح':'Password changed successfully','تم تغيير كلمة المرور. سجل دخولك الآن بالباسورد الجديد.':'Password changed. Sign in now with the new password.','تعذر تغيير كلمة المرور:':'Unable to change the password:','تعذر التحقق من الجلسة':'Unable to verify the session',
'اختار صورة صالحة':'Choose a valid photo','الصورة أكبر من 20 ميجابايت':'The photo is larger than 20 MB','تعذر تجهيز الصورة':'Unable to prepare the photo','فشل تجهيز الصورة':'Photo preparation failed','تعذر قراءة الصورة':'Unable to read the photo','جاري حفظ التأكيد...':'Saving the confirmation...','اكتب كود الأوردر':'Enter the order code','كود الأوردر موجود بالفعل':'This order code already exists',
'جاري رفع صور الأوردر...':'Uploading order photos...','✓ تم تأكيد الأوردر':'✓ Order confirmed','وحفظه على السيرفر':'and saved on the server','تم حفظ الأوردر على السيرفر ✓':'Order saved on the server ✓','فشل التحديث:':'Update failed:','حالة غير صالحة':'Invalid status','الحساب محفوظ بالفعل':'The account is already saved','جاري الحفظ...':'Saving...','تم حفظ الحساب ✓':'Account saved ✓','فشل الحفظ:':'Save failed:',
'حدد أوردر واحد على الأقل':'Select at least one order','اختار مرحلة صحيحة':'Choose a valid stage','فيه':'There are','أوردر مرحلته أحدث من المرحلة المختارة؛ الرجوع للخلف للأدمن فقط':'orders already past the chosen stage; moving backwards is for admins only','تغيير حالة':'Change the status of','أوردر إلى «':'orders to \u00ab','لم يتم تأكيد الحفظ':'Save was not confirmed',
'تم تحديث':'Updated','، وفشل':', failed','بنجاح':'successfully','الحالة محفوظة':'Status saved','الرجوع للخلف للأدمن فقط':'Moving backwards is for admins only','تم الحفظ ✓':'Saved ✓','التعديل للمدير والأدمن فقط':'Editing is for managers and admins only','الصور الحالية:':'Current photos:','— الصور الجديدة تضاف بدون حذف القديمة':'. New photos are added without deleting the old ones.',
'جاري حفظ التعديلات...':'Saving changes...','الأوردر غير موجود':'Order not found','كود الأوردر مستخدم بالفعل':'This order code is already in use','تحذير: سيتم حذف':'Warning: permanently deleting','أوردر نهائيًا من السلة مع صورها، ولا يمكن استرجاعها. هل أنت متأكد؟':'orders from the trash together with their photos. This cannot be undone. Are you sure?','للتأكيد اكتب كلمة حذف نهائي':'To confirm, type the word DELETE',
'حذف نهائي':'Delete permanently','تم إلغاء العملية':'Operation cancelled','تم حذف':'Deleted','أوردر نهائيًا.':'orders permanently.','تعذر حذف':'Unable to delete','أوردر:':'orders:','الحذف والاسترجاع للمدير والأدمن فقط':'Deleting and restoring is for managers and admins only','استرجاع الأوردر':'Restore the order','إلى مرحلته السابقة؟':'to its previous stage?','نقل الأوردر':'Move the order','إلى سلة المحذوفات؟':'to the trash?',
'لا توجد مرحلة سابقة محفوظة لهذا الأوردر. لا يمكن الاسترجاع تلقائيًا بدونها.':'No previous stage is saved for this order. It cannot be restored automatically without one.','تعذر تنفيذ العملية:':'Unable to complete the operation:','— تأكد من تشغيل تحديث قاعدة البيانات الخاص بسلة المحذوفات.':'. Make sure the trash database update has been run.',
'صورة التصميم':'Design photo','— مقاس':'. Size','العامل:':'Craftsman:','المرحلة:':'Stage:','تحديث المرحلة:':'Stage updated:','الحساب:':'Account:','تحديث الحساب:':'Account updated:','ملاحظات:':'Notes:','تعديل بيانات الأوردر ':'Edit order details','نقل إلى سلة المحذوفات':'Move to trash','استرجاع الأوردر ':'Restore the order','صورة تصميم':'Design photo','تصميم':'Design','· صورة':'· photo',
'جاري تجهيز رابط متابعة':'Preparing the tracking link for','لم يتم العثور على الأوردر في قاعدة البيانات':'The order was not found in the database','فتح رابط متابعة العميل':'Open the client tracking link','نسخ رابط العميل':'Copy the client link','✓ تم النسخ':'✓ Copied','انسخ الرابط من المربع':'Copy the link from the box','تعذر إنشاء الرابط:':'Unable to create the link:','تأكد من تفعيل إعدادات المتابعة في Supabase':'Make sure tracking is enabled in Supabase',
'تعذر تحميل لوحة الإدارة.':'Unable to load the admin panel.','العودة لصفحة الدخول الجديدة':'Back to the new sign-in page'
});
function build(){
 sorted=Object.keys(D).filter(function(k){return k.length>1}).sort(function(a,b){return b.length-a.length});
 var esc=function(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')};
 rx=new RegExp('(?<![\\u0600-\\u06FF])(?:'+sorted.map(esc).join('|')+')(?![\\u0600-\\u06FF])','g');
}
var HAS=/[\u0600-\u06FF]/;
function digits(s){
 if(!/[\u0660-\u0669\u06F0-\u06F9]/.test(s))return s;
 s=s.replace(/[\u200e\u200f]/g,'').replace(/[\u0660-\u0669]/g,function(d){return d.charCodeAt(0)-1632}).replace(/[\u06F0-\u06F9]/g,function(d){return d.charCodeAt(0)-1776});
 return s.replace(/(\d)\s*\u0635(?![\u0600-\u06FF])/g,'$1 AM').replace(/(\d)\s*\u0645(?![\u0600-\u06FF])/g,'$1 PM').replace(/\u060c/g,',');
}
function tr(s){
 if(!s)return s;{var t0=s.trim();if(t0&&Object.prototype.hasOwnProperty.call(D,t0))return s.replace(t0,function(){return D[t0]})}s=digits(s);
 var t=s.trim();if(!t)return s;
 if(Object.prototype.hasOwnProperty.call(D,t))return s.replace(t,function(){return D[t]});
 if(!HAS.test(s))return s;
 if(!rx)build();
 return s.replace(rx,function(m){return D[m]});
}
var lang='ar',orig=new WeakMap(),shown=new WeakMap();
var ATTRS=['placeholder','aria-label','alt','title','value'];
function isMetaOK(el){return el.tagName==='META'&&/^(description|og:title|og:description|apple-mobile-web-app-title)$/.test(el.getAttribute('name')||el.getAttribute('property')||'')}
function doText(n){
 var v=n.nodeValue;
 if(lang==='en'){
  var o=orig.get(n);
  if(o===undefined||shown.get(n)!==v){o=v;orig.set(n,o)}
  var out=tr(o);shown.set(n,out);if(out!==v)n.nodeValue=out;
 }else if(orig.has(n)){
  if(shown.get(n)===v)n.nodeValue=orig.get(n);
  orig.delete(n);shown.delete(n);
 }
}
function doAttr(el,a){
 var store=el.__zi||(el.__zi={});
 var v=el.getAttribute(a);if(v==null)return;
 if(lang==='en'){
  var s=store[a];
  if(!s||s[1]!==v)s=store[a]=[v,null];
  var out=tr(s[0]);s[1]=out;if(out!==v)el.setAttribute(a,out);
 }else if(store[a]){
  if(store[a][1]===v)el.setAttribute(a,store[a][0]);
  delete store[a];
 }
}
function doEl(el){
 if(el.nodeType!==1)return;
 var tag=el.tagName;if(tag==='SCRIPT'||tag==='STYLE')return;
 ATTRS.forEach(function(a){if(a==='value'&&!(tag==='INPUT'&&/^(button|submit|reset)$/.test(el.type)))return;if(el.hasAttribute(a))doAttr(el,a)});
 if(tag==='META'&&isMetaOK(el)&&el.hasAttribute('content'))doAttr(el,'content');
}
function walk(root){
 if(!root)return;
 if(root.nodeType===3){doText(root);return}
 if(root.nodeType!==1&&root.nodeType!==9&&root.nodeType!==11)return;
 var base=root.nodeType===9?root.documentElement:root;
 if(base.nodeType===1){doEl(base);if(base.tagName==='SCRIPT'||base.tagName==='STYLE')return}
 var w=document.createTreeWalker(root,5,{acceptNode:function(n){
  if(n.nodeType===1){var t=n.tagName;return(t==='SCRIPT'||t==='STYLE')?2:1}
  return 1}});
 var n;while((n=w.nextNode())){if(n.nodeType===3){if(n.parentNode&&/^(SCRIPT|STYLE)$/.test(n.parentNode.tagName))continue;doText(n)}else doEl(n)}
}
var mo=null;
function observe(){if(mo)mo.observe(document,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:ATTRS.concat(['content'])})}
function onMut(recs){
 if(lang!=='en')return;
 mo.disconnect();
 try{recs.forEach(function(r){
  if(r.type==='characterData')doText(r.target);
  else if(r.type==='attributes')doEl(r.target);
  else r.addedNodes.forEach(function(n){walk(n)});
 })}finally{observe()}
}
/* dialogs */
['alert','confirm','prompt'].forEach(function(fn){
 var f=window[fn];
 window[fn]=function(){var a=[].slice.call(arguments);if(lang==='en'&&typeof a[0]==='string')a[0]=tr(a[0]);if(fn==='prompt'&&lang==='en'&&typeof a[1]==='string')a[1]=tr(a[1]);return f.apply(window,a)};
});
var TITLE_AR=null;
function apply(){
 var root=document.documentElement;
 root.lang=lang;root.dir=lang==='en'?'ltr':'rtl';
 if(mo)mo.disconnect();
 walk(document);
 observe();
 var btn=document.getElementById('zainLang');
 if(btn){btn.textContent=lang==='en'?'\u0639\u0631\u0628\u064a':'EN';btn.setAttribute('aria-label',lang==='en'?'\u0627\u0644\u062a\u0628\u062f\u064a\u0644 \u0625\u0644\u0649 \u0627\u0644\u0639\u0631\u0628\u064a\u0629':'Switch to English');btn.title=btn.getAttribute('aria-label')}
}
function set(l){
 lang=l==='en'?'en':'ar';
 try{localStorage.setItem(KEY,lang)}catch(e){}
 apply();
 document.dispatchEvent(new CustomEvent('zain:lang',{detail:lang}));
}
function css(){
 var s=document.createElement('style');s.id='zain-lang-style';
 s.textContent='#zainLang{font:700 13px/1 Cairo,Tahoma,Arial,sans-serif;letter-spacing:.08em;color:#e5bd76;background:#120e10e6;border:1px solid #c9a365;border-radius:40px;padding:9px 15px;min-width:52px;cursor:pointer;direction:ltr;transition:.25s;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}#zainLang:hover{background:#e5bd76;color:#201410}#zainLang.float{position:fixed;top:12px;right:12px;z-index:100000;box-shadow:0 6px 22px #0008}#zainLang.inline{position:static;margin-inline-start:auto;flex:none}@media(max-width:560px){#zainLang{padding:9px 13px;font-size:12px;min-width:46px}#zainLang.float{top:auto;bottom:22px;right:14px}}';
 document.head.appendChild(s);
 var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap';document.head.appendChild(l);
}
function mount(){
 if(document.getElementById('zainLang'))return;
 var b=document.createElement('button');b.id='zainLang';b.type='button';
 b.addEventListener('click',function(){set(lang==='en'?'ar':'en')});
 var acts=document.querySelector('.nav-actions'),host=document.querySelector('.nav .shell'),mq=window.matchMedia('(max-width:560px)');
 function place(){
  if(acts){b.className='inline';acts.insertBefore(b,acts.querySelector('.nav-burger'))}
  else if(host&&!mq.matches){b.className='inline';host.insertBefore(b,host.querySelector('.navlinks')||host.querySelector('.staff'))}
  else{b.className='float';document.body.appendChild(b)}
 }
 place();
 if(mq.addEventListener)mq.addEventListener('change',place);else if(mq.addListener)mq.addListener(place);
}
function init(){
 var q=null;try{q=new URLSearchParams(location.search).get('lang')}catch(e){}
 var saved=null;try{saved=localStorage.getItem(KEY)}catch(e){}
 lang=(q==='en'||q==='ar')?q:(saved==='en'?'en':'ar');
 if(q){try{localStorage.setItem(KEY,lang)}catch(e){}}
 css();mount();
 mo=new MutationObserver(onMut);
 apply();
}
window.ZAIN_I18N={add:add,tr:tr,set:set,get:function(){return lang},apply:apply};
/* set direction early to avoid a flash */
try{if(localStorage.getItem(KEY)==='en'){document.documentElement.lang='en';document.documentElement.dir='ltr'}}catch(e){}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
