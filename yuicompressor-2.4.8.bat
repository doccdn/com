set total=10
::js-ajax-1.01.js
set type1=js
set source1=libs-sp/js-ajax-1.01.js
set output1=libs-sp/js-ajax-1.01.min.js
::js-func-3.01.js
set type2=js
set source2=libs-sp/js-func-3.01.js
set output2=libs-sp/js-func-3.01.min.js
::js-pattem-3.01.js
set type3=js
set source3=libs-sp/js-pattem-3.01.js
set output3=libs-sp/js-pattem-3.01.min.js
::ng-func-3.01.css
set type4=css
set source4=libs-sp/ng-func-3.01.css
set output4=libs-sp/ng-func-3.01.min.css
::ng-func-3.01.js
set type5=js
set source5=libs-sp/ng-func-3.01.js
set output5=libs-sp/ng-func-3.01.min.js
::ng-tf-template-3.01.js
set type6=js
set source6=libs-sp/ng-tf-template-3.01.js
set output6=libs-sp/ng-tf-template-3.01.min.js
::tf-animation-3.01.css
set type7=css
set source7=libs-sp/tf-animation-3.01.css
set output7=libs-sp/tf-animation-3.01.min.css
::tf-form-3.01.css
set type8=css
set source8=libs-sp/tf-form-3.01.css
set output8=libs-sp/tf-form-3.01.min.css
::tf-icon-3.01.css
set type9=css
set source9=libs-sp/tf-icon-3.01.css
set output9=libs-sp/tf-icon-3.01.min.css
::tf-style-3.02.css
set type10=css
set source10=libs-sp/tf-style-3.02.css
set output10=libs-sp/tf-style-3.02.min.css
FOR /L %%i in (1,1,%total%) do call :MAKEMIN %%i
goto End

:MAKEMIN
call set type=%%type%1%%
call set source=%%source%1%%
call set output=%%output%1%%
@java -Xoptimize -Xms256m -Xmx256m -XX:+UseConcMarkSweepGC -jar yuicompressor-2.4.8.jar %source% -o %output% --type %type% --charset utf-8 --nomunge
goto :eof

:End
::pause