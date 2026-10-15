<?php declare(strict_types = 1);

use Sys\AppFactory;

$GLOBALS['_start'] = hrtime(true);
$GLOBALS['_ram'] = memory_get_usage();

chdir(__DIR__);

define('DOCROOT', './');
define('APPPATH', DOCROOT . '../../burime/');
require_once APPPATH . 'common/config/bootstrap.php';

$factory = new AppFactory();
$app = $factory->create();
$response = $app->run();
$app->emit($response);
