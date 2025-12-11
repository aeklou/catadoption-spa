public function update($table, $data, $idName, $idValue) {
    try {
        // Build "column = :column" pairs for the SET clause
        $fields = [];
        foreach ($data as $column => $value) {
            $fields[] = "`$column` = :$column";
        }

        // Convert array to comma-separated string
        $setClause = implode(", ", $fields);

        // Build SQL
        $sql = "UPDATE `$table` SET $setClause WHERE `$idName` = :id";

        $stmt = $this->db->prepare($sql);

        // Bind regular field values
        foreach ($data as $column => $value) {
            $stmt->bindValue(":$column", $value);
        }

        // Bind primary key
        $stmt->bindValue(":id", $idValue);

        return $stmt->execute();

    } catch (PDOException $e) {
        echo "Update Error: " . $e->getMessage();
        return false;
    }
}
