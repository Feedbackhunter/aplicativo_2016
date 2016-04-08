<?php
/**
* 
*/
class bd
{
	protected $host;
	protected $dbname;
	protected $user;
	protected $senha; 
	private $conn;

	function bd()
	{
		$this->dbname = 'u170860130_new';
		$this->host = 'mysql:host=mysql.hostinger.com.br;dbname='.$this->dbname;
		$this->user = 'u170860130_feed';
		$this->senha = 'feedhunter2016';
	}

	public function connect(){
		try {
			$this->conn = new PDO($this->host, $this->user, $this->senha);
		} catch (PDOException $e) {
			echo $e->getMessage();
		}
	}
	public function sql($sql){
		$q = $this->conn->prepare($sql);
		if ($q->execute()) return 1;
		else return 0;
	}
	private function createSQL($result){
		date_default_timezone_set('America/Sao_Paulo');
		if (isset($result)){
			if ($result['QUANT_PERGUNTAS_FECHADAS'] !=0 || $result['QUANT_PERGUNTAS_ABERTAS']!=0){
				$sql = 'INSERT INTO '.$result['NOME_TABELA']. ' VALUES (\''.$_POST['ID_CELULAR'].'\',\''.date('Y-m-d H:i:s').'\', ';
				for($i=1; $i<=$result['QUANT_PERGUNTAS_FECHADAS']; $i++){
					if (empty($_POST['pergunta'.$i])) $_POST['pergunta'.$i] = 0;
					if ($i+1 > $result['QUANT_PERGUNTAS_FECHADAS']) $sql = $sql.$_POST['pergunta'.$i];
					else $sql = $sql.$_POST['pergunta'.$i]. ', ';
				}
				for($i=1; $i<=$result['QUANT_PERGUNTAS_ABERTAS']; $i++){
					if (empty($_POST['pergunta_aberta_'.$i])) $_POST['pergunta_aberta_'.$i] = '\' \'';
					if ($i == 1) $sql = $sql.", ";
					if ($i+1 > $result['QUANT_PERGUNTAS_ABERTAS']) $sql = $sql."'".$_POST['pergunta_aberta_'.$i]."'";
					else $sql = $sql."'".$_POST['pergunta_aberta_'.$i]. '\', ';
				}
				$sql = $sql . ');';
			}
			else $sql = '';	
			return $sql;			
		}
		else return null;
	}
	private function primeiraRespostaDiaria($result, $ID_CELULAR){
		$sql = 'SELECT DATA FROM '.$result['NOME_TABELA'].' WHERE ID_CELULAR = '.$ID_CELULAR;
		$stmt = $this->conn->prepare($sql);
		$stmt->execute();
		$result = $stmt->fetchAll();
		$data = date('Y-m-d');
		$dateObj = new DateTime($result[0]['DATA']);
		for ($i=0; $i<count($result); $i++){
			$dateObj = new DateTime($result[$i]['DATA']);
			if ($data == date_format($dateObj, 'Y-m-d')){
				return false;
			}
		}
		return true;
	}
	public function insertAnswers($ID_FORMULARIO, $isDaily){
		if ($this->conn){
			$sql = 'SELECT * FROM TABELAS where ID_FORMULARIO = '.$ID_FORMULARIO;
			$stmt = $this->conn->prepare($sql);
			$stmt->execute();
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			if (isset($result)){
			 	if ($isDaily){
			 		if ($this->primeiraRespostaDiaria($result, $_POST['ID_CELULAR'])){
				 		$sql = $this->createSQL($result);
						if (isset($sql) && $sql != ''){
							echo $sql;
							$this->sql($sql);
							return true;
						}
				 	}
			 	}
				else {
					$sql = $this->createSQL($result);
					if (isset($sql) && $sql != ''){
						echo $sql;
						$this->sql($sql);
						return true;
					}
				}
				
			}
		}
		else return false;
		return false;
	}



	

}


?>