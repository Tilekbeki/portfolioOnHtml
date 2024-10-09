<?php 

if ($_SERVER['REQUEST_METHOD'] == 'POST') { 

    function get_data() {
        global $name; 
        $datae = array();
        $datae[] = array(
            'name' => $_POST['phone_or_email'], // Изменено на PhoneOrEmail
            'descr' => $_POST['points'], // Изменено на Points
            'link' => $_POST['category'], // Изменено на Category
            'category' => $_POST['category'],
        );
        return json_encode($datae);
    }

    $name = "statistic"; // Изменено на statistics
    $file_name = $name. '.json';

    // Проверяем, существует ли файл и содержимое файла
    if (file_exists($file_name)) {
        $existingData = json_decode(file_get_contents($file_name), true);
        $found = false;
        foreach ($existingData as &$entry) {
            if ($entry['PhoneOrEmail'] === $_POST['phone_or_email'] || $entry['PhoneOrEmail'] === $_POST['email']) { // Проверяем по номеру телефона или почте
                $found = true;
                break;
            }
        }
        if (!$found) {
            $existingData[] = array(
                'PhoneOrEmail' => $_POST['phone_or_email'], // Изменено на PhoneOrEmail
                'Points' => $_POST['points'], // Изменено на Points
                'Category' => $_POST['category'], // Изменено на Category
            );
        }
    } else {
        $existingData = array(); // Инициализируем пустой массив, если файл не существует
    }

    // Записываем обновленные данные обратно в файл
    if (file_put_contents("$file_name", json_encode($existingData))) {
        echo $file_name. ' file updated';
    } else {
        echo 'There is some error';
    }
}
?>