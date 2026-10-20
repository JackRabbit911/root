<?php declare(strict_types = 1);

use Sys\AppFactory;

define('DOCROOT', __DIR__ . '/');
define('APPPATH', dirname(__DIR__) . '/application/');
require_once APPPATH . 'common/config/bootstrap.php';

$factory = new AppFactory();
$app = $factory->create();
$response = $app->run();
$app->emit($response);
