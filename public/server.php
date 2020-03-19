<?php
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$NAME = isset($_POST['text']) ? $_POST['text'] : '';
$MAILFROM = isset($_POST['email']) ? $_POST['email'] : '';

$mail->isSMTP();
$mail->Host = 'smtp.yandex.ru';
$mail->SMTPAuth = true;
$mail->Username = 'feedback@bolshovdev.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = '2711112Leo'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

$mail->setFrom('feedback@bolshovdev.ru'); // от кого будет уходить письмо?
$mail->addAddress('feedback@bolshovdev.ru');     // Кому будет уходить письмо 

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Хотят связаться';
$mail->Body    = $NAME . ' оставил заявку<br>Почта этого пользователя: ' . $MAILFROM;
$mail->AltBody = '';

if(!$mail->send()) {
  throw new Exception('Что-то пошло не так');
} else {
  echo "Email successful";  
}