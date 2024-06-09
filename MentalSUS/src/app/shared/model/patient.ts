export interface Paciente {
    paciente_id: string;
    paciente_nome: string;
    telefone: string;
    medico_id: string;
    medico_nome: string;
    genero: string;
    dataNascimento: Date;
    dataAgendamento: Date;
    prescricao: string;
}