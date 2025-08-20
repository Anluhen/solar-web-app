import React, { useState } from 'react'
import InputField from './InputField'

interface FreteFormProps {
  editable: boolean
  hidden: boolean
}

interface FormData {
  obra: string
  ovsProjeto: string
  percentualFretePrevistoPL: string
  objetoCusto: string
  valorEnvio: string
  romaneios: string
  localColeta: string
  contatoLocalColeta: string
  localEntrega: string
  contatoDestino: string
  dataEstimadaColeta: string
  nivelUrgencia: string
  restricaoVeiculo: string
  valorCotDRLogistica: string
  percentualDRLogisticaUtilizado: string
  percentualMaterialEnviado: string
  emailResponsavel: string
  observacoes: string
}

export default function FreteForm({
  editable,
  hidden,
}: FreteFormProps) {
  const [formData, setFormData] = useState<FormData>({
    obra: '',
    ovsProjeto: '',
    percentualFretePrevistoPL: '',
    objetoCusto: '',
    valorEnvio: '',
    romaneios: '',
    localColeta: '',
    contatoLocalColeta: '',
    localEntrega: '',
    contatoDestino: '',
    dataEstimadaColeta: '',
    nivelUrgencia: '',
    restricaoVeiculo: '',
    valorCotDRLogistica: '',
    percentualDRLogisticaUtilizado: '',
    percentualMaterialEnviado: '',
    emailResponsavel: '',
    observacoes: '',
  })

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form className={'mt-8 p-6 space-y-6 bg-white rounded shadow' + (hidden ? ' hidden' : '')}>
      <InputField
        label="Obra"
        value={formData.obra}
        editable={editable}
        onChange={val => handleChange('obra', val)}
      />

      <InputField
        label="OVs do projeto (NF mãe e transporte)"
        value={formData.ovsProjeto}
        editable={editable}
        onChange={val => handleChange('ovsProjeto', val)}
      />

      <InputField
        label="Percentual do frete previsto na PL"
        value={formData.percentualFretePrevistoPL}
        editable={editable}
        onChange={val => handleChange('percentualFretePrevistoPL', val)}
      />

      <InputField
        label="Objeto de custo para lançamento do frete (DR ou PEP)"
        value={formData.objetoCusto}
        editable={editable}
        onChange={val => handleChange('objetoCusto', val)}
      />

      <InputField
        label="Valor do envio"
        value={formData.valorEnvio}
        editable={editable}
        onChange={val => handleChange('valorEnvio', val)}
      />

      <InputField
        label="Romaneio(s) (anexar no e-mail)"
        value={formData.romaneios}
        editable={editable}
        onChange={val => handleChange('romaneios', val)}
      />

      <InputField
        label="Local de coleta"
        value={formData.localColeta}
        editable={editable}
        onChange={val => handleChange('localColeta', val)}
      />

      <InputField
        label="Contato no local de coleta"
        value={formData.contatoLocalColeta}
        editable={editable}
        onChange={val => handleChange('contatoLocalColeta', val)}
      />

      <InputField
        label="Local de entrega"
        value={formData.localEntrega}
        editable={editable}
        onChange={val => handleChange('localEntrega', val)}
      />

      <InputField
        label="Contato no destino"
        value={formData.contatoDestino}
        editable={editable}
        onChange={val => handleChange('contatoDestino', val)}
      />

      <InputField
        label="Data estimada da coleta"
        value={formData.dataEstimadaColeta}
        editable={editable}
        onChange={val => handleChange('dataEstimadaColeta', val)}
      />

      <InputField
        label="Nível de urgência / data máxima para entrega"
        value={formData.nivelUrgencia}
        editable={editable}
        onChange={val => handleChange('nivelUrgencia', val)}
      />

      <InputField
        label="Existe restrição de veículo?"
        value={formData.restricaoVeiculo}
        editable={editable}
        onChange={val => handleChange('restricaoVeiculo', val)}
      />

      <InputField
        label="Valor COT DR Logística (R$)"
        value={formData.valorCotDRLogistica}
        editable={editable}
        onChange={val => handleChange('valorCotDRLogistica', val)}
      />

      <InputField
        label="Quanto do DR da Logística foi utilizado (%)"
        value={formData.percentualDRLogisticaUtilizado}
        editable={editable}
        onChange={val => handleChange('percentualDRLogisticaUtilizado', val)}
      />

      <InputField
        label="Quanto de material já foi enviado (%)"
        value={formData.percentualMaterialEnviado}
        editable={editable}
        onChange={val => handleChange('percentualMaterialEnviado', val)}
      />

      <InputField
        label="E-mail do PM/Analista responsável"
        value={formData.emailResponsavel}
        editable={editable}
        onChange={val => handleChange('emailResponsavel', val)}
      />

      <InputField
        label="Observações adicionais"
        value={formData.observacoes}
        editable={editable}
        onChange={val => handleChange('observacoes', val)}
      />
    </form>
  )
}
